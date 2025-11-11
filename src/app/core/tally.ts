import { Injectable } from "@angular/core";
import { DefaultMap, NumberCounter } from "@gouvernathor/python/collections";
import { Order, Scores, Simple } from "ecclesia/election/ballots";
import { Candidate } from "./candidate";
import { ApprovalBallot, PluralityBallot, RankedBallot, ScoreBallot } from "./ballot";

/** Transforms a list of individual ballots into a Ballots object (a tally) for Ecclesia */
@Injectable({
    providedIn: "root",
})
export class TallyService {
    tallyPluralityToSimple(
        ballots: Iterable<PluralityBallot>,
    ): Simple<Candidate> {
        return NumberCounter.fromKeys(ballots);
    }

    tallyApprovalToSimple(
        ballots: Iterable<ApprovalBallot>,
    ): Simple<Candidate> {
        return NumberCounter.fromKeys(Array.from(ballots).flatMap(b => Array.from(b)));
    }

    tallyRankedToOrder(
        ballots: Iterable<RankedBallot>,
    ): Order<Candidate> {
        return Array.from(ballots);
    }

    tallyScoreToScores(
        ballots: Iterable<ScoreBallot>,
        { maxScore }: { maxScore: number },
    ): Scores<Candidate> {
        const rawScores = new DefaultMap<Candidate, number[]>(() => Array(maxScore).fill(0));
        for (const ballot of ballots) {
            for (const [candidate, scoreBasedOn1] of ballot.entries()) {
                rawScores.get(candidate)[scoreBasedOn1 - 1] += 1;
            }
        }
        return Scores.fromEntries(Array.from(rawScores.entries()));
    }
}
