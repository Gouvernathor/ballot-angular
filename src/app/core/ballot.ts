import { Candidate } from "./candidate";

export interface PluralityBallot extends Candidate {}
export interface RankedBallot extends ReadonlyArray<Candidate> {}
export interface ApprovalBallot extends ReadonlySet<Candidate> {}
export interface ScoreBallot extends ReadonlyMap<Candidate, number> {}
export type Ballot =
    | PluralityBallot
    | RankedBallot
    | ApprovalBallot
    | ScoreBallot
;
