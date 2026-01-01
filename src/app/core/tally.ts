import { Injectable } from "@angular/core";
import { DefaultMap } from "@gouvernathor/python/collections";
import { Scores } from "ecclesia/election/tally";
import { tallyApprovalToSimple, tallyRankedToOrder, tallySingleToSimple } from "ecclesia/election/tallying";
import { Candidate } from "./candidate";
import { ScoreBallot } from "./ballot";

/** Transforms a list of individual ballots into a Ballots object (a tally) for Ecclesia */
@Injectable({
    providedIn: "root",
})
export class TallyService {
    readonly tallyPluralityToSimple = tallySingleToSimple;
    readonly tallyApprovalToSimple = tallyApprovalToSimple;
    readonly tallyRankedToOrder = tallyRankedToOrder;

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
