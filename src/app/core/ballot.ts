import { Candidate } from "./candidate";

export type PluralityBallot = Candidate;
export type RankedBallot = readonly Candidate[];
export type ApprovalBallot = ReadonlySet<Candidate>;
export type ScoreBallot = ReadonlyMap<Candidate, number>;
export type Ballot =
    | PluralityBallot
    | RankedBallot
    | ApprovalBallot
    | ScoreBallot
;
