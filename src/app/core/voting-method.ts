import { ApprovalBallot, Ballot, PluralityBallot, RankedBallot, ScoreBallot } from "./ballot";
import { Opinions, Candidate } from "./candidate";

export interface VotingMethod<B extends Ballot> {
    (voterOpinions: Opinions, candidates: readonly Candidate[]): B;
}


export interface PluralityVotingMethod extends VotingMethod<PluralityBallot> {
    kind: "plurality";
}
export function makePluralityVotingMethod(): PluralityVotingMethod {
    function plurality(
        voterOpinions: Opinions,
        candidates: readonly Candidate[]
    ): PluralityBallot {
        let bestCandidate: Candidate;
        let bestDistanceSq = Infinity;
        for (const candidate of candidates) {
            const cOpinions = candidate.getOpinions();
            const dx = cOpinions[0] - voterOpinions[0];
            const dy = cOpinions[1] - voterOpinions[1];
            const distSq = dx * dx + dy * dy;
            if (distSq < bestDistanceSq) {
                bestDistanceSq = distSq;
                bestCandidate = candidate;
            }
        }
        return bestCandidate!;
    }
    plurality.kind = "plurality" as const;
    return plurality;
}


export interface RankedVotingMethod extends VotingMethod<RankedBallot> {
    kind: "ranked";
}
export function makeRankedVotingMethod(): RankedVotingMethod {
    function ranked(
        voterOpinions: Opinions,
        candidates: readonly Candidate[]
    ): RankedBallot {
        return candidates.slice().sort((c1, c2) => {
            const o1 = c1.getOpinions();
            const x1 = o1[0] - voterOpinions[0];
            const y1 = o1[1] - voterOpinions[1];
            const dist1sq = x1 * x1 + y1 * y1;

            const o2 = c2.getOpinions();
            const x2 = o2[0] - voterOpinions[0];
            const y2 = o2[1] - voterOpinions[1];
            const dist2sq = x2 * x2 + y2 * y2;

            return dist1sq - dist2sq;
        });
    }
    ranked.kind = "ranked" as const;
    return ranked;
}


export interface ApprovalVotingMethod extends VotingMethod<ApprovalBallot> {
    kind: "approval";
}
export function makeApprovalVotingMethod(
    approvalRadius = 100,
): ApprovalVotingMethod {
    function approval(
        voterOpinions: Opinions,
        candidates: readonly Candidate[]
    ): ApprovalBallot {
        return new Set(candidates.filter(candidate => {
            const cOpinions = candidate.getOpinions();
            const dx = cOpinions[0] - voterOpinions[0];
            const dy = cOpinions[1] - voterOpinions[1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            return (dist < approvalRadius);
        }));
    }
    approval.kind = "approval" as const;
    return approval;
}


export interface ScoreVotingMethod extends VotingMethod<ScoreBallot> {
    kind: "score";
}
export function makeScoreVotingMethod(
    bigRange = false,
): ScoreVotingMethod {
    const step = bigRange ? 74 : 30;
    function scaleScore(dist: number): 1|2|3|4|5 {
        if (dist < step) {
            return 5;
        } else if (dist < 2 * step) {
            return 4;
        } else if (dist < 3 * step) {
            return 3;
        } else if (dist < 4 * step) {
            return 2;
        } else {
            return 1;
        }
    }

    function score(
        voterOpinions: Opinions,
        candidates: readonly Candidate[]
    ): ScoreBallot {
        return new Map<Candidate, number>(candidates.map(candidate => {
            const cOpinions = candidate.getOpinions();
            const dx = cOpinions[0] - voterOpinions[0];
            const dy = cOpinions[1] - voterOpinions[1];
            const dist = Math.sqrt(dx * dx + dy * dy);
            return [candidate, scaleScore(dist)];
        }));
    }
    score.kind = "score" as const;
    return score;
}
