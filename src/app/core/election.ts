import { inject, Injectable, signal } from '@angular/core';
import { NumberCounter } from '@gouvernathor/python/collections';
import { Attribution as EcclesiaAttribution, plurality as ecclesiaPlurality } from 'ecclesia/election/attribution';
import { Ballots, Order, Simple } from 'ecclesia/election/ballots';
import { Candidate, Opinions } from './candidate';
import { GaussianVoters } from './voter-group';
import { TallyService } from './tally';
import { CastBallotSignalType, VotingService } from './voting';
import { ApprovalBallot, PluralityBallot, RankedBallot, ScoreBallot } from './ballot';

const ELECTION_METHOD_IDS = [
    "FPTP",
    "IRV",
    "Borda",
    "Condorcet",
    "Approval",
    "Score",
] as const;
export type ElectionMethodId = typeof ELECTION_METHOD_IDS[number];
export function isElectionMethodId(value: string|undefined): value is ElectionMethodId {
    return (ELECTION_METHOD_IDS as readonly string[]).includes(value ?? "");
}

export interface FPTPResultInformation {
    tally: Simple<Candidate>;
    winner: Candidate;
}
export interface IRVResultInformation {
    tally: Order<Candidate>;
    steps: readonly {
        /** Takes into account the vote reports from previously eliminated candidates */
        firstChoicesForRemainingCandidates: Simple<Candidate>;
        /** Either the eliminated candidate, if this is not the last round, or the winner if this is the last round */
        selectedCandidate: Candidate;
    }[];
    /** Information already present as steps[-1].selectedCandidate */
    winner: Candidate;
}
export interface BordaResultInformation {
    tally: Order<Candidate>;
    /** The number of points for each candidate from each ballot, is its 0-based index */
    processedTally: Simple<Candidate>;
    /** The candidate with the lowest number of points */
    winner: Candidate;
}
export interface CondorcetResultInformation {
    tally: Order<Candidate>;
    pairwiseDuels: readonly {
        candidates: [Candidate, Candidate];
        winnerVotes: number;
        loserVotes: number;
        winner: Candidate;
    }[];
    duelWinsPerCandidate: Simple<Candidate>;
    winner: Candidate|null;
}
export interface ApprovalResultInformation {
    tally: Simple<Candidate>;
    winner: Candidate;
}
export interface ScoreResultInformation {
    /** The number of points for each candidate from each ballot, is its 1-based score */
    processedTally: Simple<Candidate>;
    /** Number by which to divide a processedTally value to get the average score */
    totalVoters: number;
    /** The number of possible scores, which is also the maximum score since it's 1-based */
    numScores: number;
    winner: Candidate;
}

@Injectable({
    providedIn: 'root',
})
export class ElectionService {
    private readonly votingService = inject(VotingService);
    private readonly tallyService = inject(TallyService);

    makeCandidates(
        input: (2|3|4|5)|Iterable<Opinions>|undefined,
    ): readonly Candidate[] {
        if (input === undefined) {
            return this.makeCandidates(3);
        }
        if (typeof input === "number") {
            return this.makeCandidates(this.makeDefaultCandidateOpinions(
                Math.min(Math.max(2, Math.floor(input)), 5) as 2|3|4|5));
        }
        return Array.from(input, ([x, y], i) => ({
            shape: this.candidateShapes[i],
            getOpinions: signal([x, y]),
        }));
    }
    private candidateShapes = ["square", "triangle", "hexagon", "pentagon", "bob"] as const;
    private *makeDefaultCandidateOpinions(numCandidates: 2|3|4|5): Iterable<Opinions> {
        const startAngle =
            numCandidates === 3 ?
                Math.PI / 6 :
            numCandidates === 4 ?
                Math.PI / 4 :
            numCandidates === 5 ?
                Math.PI / 3.3 :
                0;
        const radius = 100;
        for (let i = 0; i < numCandidates; i++) {
            const angle = startAngle + (i * 2 * Math.PI / numCandidates);
            const x = 150 - radius * Math.cos(angle);
            const y = 150 - radius * Math.sin(angle);
            yield [x, y];
        }
    }

    makeVoterGroups(
        input: (1|2|3)|Iterable<Opinions>|undefined,
    ): ReadonlySet<GaussianVoters> {
        if (input === undefined) {
            return this.makeVoterGroups(1);
        }
        if (typeof input === "number") {
            return this.makeVoterGroups(this.makeDefaultVoterGroupOpinions(
                Math.min(Math.max(1, Math.floor(input)), 3) as 1|2|3));
        }
        const opinions = Array.isArray(input) ? input as Opinions[] : Array.from(input);
        const num = (4 - opinions.length) as 1|2|3;
        return new Set(opinions.map(([x, y]) =>
            new GaussianVoters(signal([x, y]), { num })));
    }
    private makeDefaultVoterGroupOpinions(numVoterGroups: 1|2|3): readonly Opinions[] {
        switch (numVoterGroups) {
            case 1:
                return [[150, 150]];
            case 2:
                return [[150, 100], [150, 200]];
            case 3:
                return [[150, 115], [115, 180], [185, 180]];
        }
    }

    private ecclesiaAttributionToSingleSeatAttribution<T extends Ballots<Candidate>>(
        attribution: EcclesiaAttribution<Candidate, T>,
    ): (tally: T) => Candidate {
        return (tally) => {
            const result = attribution(tally);
            if (result.size !== 1) {
                throw new Error(`Expected a single winner, but got ${result.size}`);
            }
            return result.keys().next().value!;
        };
    }

    private readonly pluralityAttrib = this.ecclesiaAttributionToSingleSeatAttribution(
        ecclesiaPlurality<Candidate>({ nSeats: 1 }));
    generateFPTPResultInformation(
        castBallots: CastBallotSignalType<PluralityBallot>,
    ): FPTPResultInformation {
        const tally = this.tallyService.tallyPluralityToSimple(
            this.votingService.extractBallots(castBallots));
        const winner = this.pluralityAttrib(tally);
        return { tally, winner };
    }
    generateIRVResultInformation(
        castBallots: CastBallotSignalType<RankedBallot>,
    ): IRVResultInformation {
        const tally = this.tallyService.tallyRankedToOrder(
            this.votingService.extractBallots(castBallots));
        const eliminated = new Set<Candidate>();
        const steps: IRVResultInformation["steps"][0][] = [];
        while (true) {
            const firstChoices = NumberCounter.fromKeys(tally
                .map(ballot => ballot.find(choice => !eliminated.has(choice)))
                .filter(c => c !== undefined));
            const remainingVotes = firstChoices.total;

            // Get the candidates with the most and least votes
            const sorted = Array.from(firstChoices.entries())
                .sort((a, b) => a[1] - b[1]);
            if (sorted.at(-1)![1] >= remainingVotes / 2) {
                const winner = sorted.at(-1)![0];
                steps.push({
                    firstChoicesForRemainingCandidates: firstChoices,
                    selectedCandidate: winner,
                });
                return { tally, steps, winner };
            }

            const toEliminate = sorted[0][0];
            steps.push({
                firstChoicesForRemainingCandidates: firstChoices,
                selectedCandidate: toEliminate,
            });
            eliminated.add(toEliminate);
        }
    }
    generateBordaResultInformation(
        castBallots: CastBallotSignalType<RankedBallot>,
    ): BordaResultInformation {
        const tally = this.tallyService.tallyRankedToOrder(
            this.votingService.extractBallots(castBallots));
        const processedTally = NumberCounter.fromEntries<Candidate>();
        for (const ballot of tally) {
            ballot.forEach((candidate, index) => {
                processedTally.increment(candidate, index);
            });
        }
        const winner = Array.from(processedTally.entries())
            .reduce((minEntry, entry) =>
                entry[1] < minEntry[1] ? entry : minEntry)[0];
        return { tally, processedTally, winner };
    }
    generateCondorcetResultInformation(
        castBallots: CastBallotSignalType<RankedBallot>,
        candidates: readonly Candidate[],
    ): CondorcetResultInformation {
        const tally = this.tallyService.tallyRankedToOrder(
            this.votingService.extractBallots(castBallots));
        const pairwiseDuels: CondorcetResultInformation["pairwiseDuels"][0][] = [];
        const duelWinsPerCandidate = NumberCounter.fromEntries<Candidate>();
        for (let i = 0; i < candidates.length; i++) {
            for (let j = i + 1; j < candidates.length; j++) {
                const candidateA = candidates[i];
                const candidateB = candidates[j];

                let votesForA = 0;
                let votesForB = 0;
                for (const ballot of tally) {
                    const winner = ballot.find(c => c === candidateA || c === candidateB);
                    if (winner === candidateA) {
                        votesForA++;
                    } else if (winner === candidateB) {
                        votesForB++;
                    }
                }
                const [duelWinner, winnerVotes, loserVotes] = votesForA > votesForB ?
                    [candidateA, votesForA, votesForB] :
                    [candidateB, votesForB, votesForA];

                pairwiseDuels.push({
                    candidates: [candidateA, candidateB],
                    winnerVotes,
                    loserVotes,
                    winner: duelWinner,
                });
                duelWinsPerCandidate.increment(duelWinner, 1);
            }
        }
        const [condoWinnerCandidate] = candidates.filter(c =>
            duelWinsPerCandidate.get(c) === candidates.length - 1);
        return { tally, pairwiseDuels, duelWinsPerCandidate, winner: condoWinnerCandidate ?? null };
    }
    generateApprovalResultInformation(
        castBallots: CastBallotSignalType<ApprovalBallot>,
    ): ApprovalResultInformation {
        const tally = this.tallyService.tallyApprovalToSimple(
            this.votingService.extractBallots(castBallots));
        const winner = this.pluralityAttrib(tally);
        return { tally, winner };
    }
    generateScoreResultInformation(
        castBallots: CastBallotSignalType<ScoreBallot>,
        numScores: number,
    ): ScoreResultInformation {
        const allBallots = Array.from(this.votingService.extractBallots(castBallots));
        const processedTally = NumberCounter.fromEntries<Candidate>();
        for (const ballot of allBallots) {
            for (const [candidate, score] of ballot.entries()) {
                processedTally.increment(candidate, score);
            }
        }
        const totalVoters = allBallots.length;
        const winner = Array.from(processedTally.entries())
            .reduce((maxEntry, entry) =>
                entry[1] > maxEntry[1] ? entry : maxEntry)[0];
        return { processedTally, totalVoters, numScores, winner };
    }
}
