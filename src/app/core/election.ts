import { inject, Injectable, signal } from '@angular/core';
import { Attribution as EcclesiaAttribution, plurality as ecclesiaPlurality } from 'ecclesia/election/attribution';
import { Ballots, Order, Scores, Simple } from 'ecclesia/election/ballots';
import { Candidate } from './candidate';
import { GaussianVoters } from './voter-group';
import { TallyService } from './tally';
import { CastBallotSignalType, Voting } from './voting';
import { ApprovalBallot, PluralityBallot, RankedBallot, ScoreBallot } from './ballot';
import { NumberCounter } from '@gouvernathor/python/collections';

export type ElectionMethodId = "FPTP" | "IRV" | "Borda" | "Condorcet" | "Approval" | "Score";

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
        votesForFirst: number;
        votesForSecond: number;
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
    tally: Scores<Candidate>;
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
    private readonly votingService = inject(Voting);
    private readonly tallyService = inject(TallyService);

    makeDefaultCandidates(numCandidates: 1|2|3|4|5 = 3): Candidate[] {
        const startAngle =
            numCandidates === 3 ?
                Math.PI / 6 :
            numCandidates === 4 ?
                Math.PI / 4 :
            numCandidates === 5 ?
                Math.PI / 3.3 :
                0;
        const radius = 100;
        return (["square", "triangle", "hexagon", "pentagon", "bob"] as const)
            .slice(0, numCandidates)
            .map((shape, i) => {
                const angle = startAngle + (i * 2 * Math.PI / numCandidates);
                const x = 150 + radius * Math.cos(angle);
                const y = 150 + radius * Math.sin(angle);
                return { shape, getOpinions: signal([x, y]) };
            });
    }

    makeDefaultVoterGroups(numVoterGroups: 1|2|3 = 1): ReadonlySet<GaussianVoters> {
        switch (numVoterGroups) {
            case 1:
                return new Set([
                    new GaussianVoters(signal([150, 150]), { num: 3 }),
                ]);
            case 2:
                return new Set([
                    new GaussianVoters(signal([150, 100]), { num: 2 }),
                    new GaussianVoters(signal([150, 200]), { num: 2 }),
                ]);
            case 3:
                return new Set([
                    new GaussianVoters(signal([150, 115]), { num: 1 }),
                    new GaussianVoters(signal([115, 180]), { num: 1 }),
                    new GaussianVoters(signal([185, 180]), { num: 1 }),
                ]);
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
        return null!;
    }
    generateCondorcetResultInformation(
        castBallots: CastBallotSignalType<RankedBallot>,
    ): CondorcetResultInformation {
        const tally = this.tallyService.tallyRankedToOrder(
            this.votingService.extractBallots(castBallots));
        return null!;
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
        const tally = this.tallyService.tallyScoreToScores(
            this.votingService.extractBallots(castBallots),
            { maxScore: numScores })
        return null!;
    }
}
