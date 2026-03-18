import { Approval, Ranked, Single } from "ecclesia/election/ballot";
import { Candidate } from "./candidate";

export type PluralityBallot = Single<Candidate>;
export type RankedBallot = Ranked<Candidate>;
export type ApprovalBallot = Approval<Candidate>;
/** Contrary to the Ecclesia Score format, this is 1-based instead of 0-based */
export interface ScoreBallot extends ReadonlyMap<Candidate, number> {}
export type Ballot =
    | PluralityBallot
    | RankedBallot
    | ApprovalBallot
    | ScoreBallot
;
