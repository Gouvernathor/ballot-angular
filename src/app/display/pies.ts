import { Injectable } from '@angular/core';
import { Candidate } from '../core/candidate';
import { ApprovalBallot, Ballot, PluralityBallot, RankedBallot, ScoreBallot } from '../core/ballot';
import { VotingMethod } from '../core/voting-method';

/** TODO the color should be #bbb */
export const BLANK = Symbol("blank");
export interface PieShare {
    candidate: Candidate | typeof BLANK;
    share: number;
}
export type PieShares = readonly PieShare[] & { total?: number };

@Injectable({
    providedIn: 'root',
})
export class Pies {
    // TODO make a color service for candidates, and change the PieShare type to include a color instead of a candidate

    getPieShares<B extends Ballot>(
        votingMethod: VotingMethod<B>,
        ballot: B,
    ): PieShares {
        switch (votingMethod.kind) {
            case "plurality":
                return this.getPluralityShares(ballot as PluralityBallot);

            case "ranked":
                return this.getRankedShares(ballot as RankedBallot);

            case "approval":
                return this.getApprovalShares(ballot as ApprovalBallot);

            case "score":
                return this.getScoreShares(ballot as ScoreBallot, votingMethod);
        }
    }

    getPluralityShares(ballot: PluralityBallot): PieShares {
        const shares: PieShares = [{ candidate: ballot, share: 1 }];
        shares.total = 1;
        return shares;
    }

    getRankedShares(ballot: RankedBallot): PieShares {
        const n = ballot.length;
        const shares: PieShares = ballot.map((candidate, index) => ({
            candidate,
            share: (n - index),
        }));
        shares.total = (n * (n + 1)) / 2;
        return shares;
    }

    getApprovalShares(ballot: ApprovalBallot): PieShares {
        const n = ballot.size;
        if (n === 0) {
            const shares: PieShares = [{ candidate: BLANK, share: 1 }];
            shares.total = 1;
            return shares;
        }

        const shares: PieShares = Array.from(ballot, candidate => ({
            candidate,
            share: 1,
        }));
        shares.total = n;
        return shares;
    }

    getScoreShares(ballot: ScoreBallot, { numScores }: { numScores: number }): PieShares {
        const totalSlices = ballot.size * (numScores - 1);
        let leftover = totalSlices;

        const mutShares: PieShare[] = Array.from(ballot.entries(), ([candidate, score]) => {
            leftover -= score;
            return {
                candidate,
                share: score,
            };
        });
        mutShares.push({
            candidate: BLANK,
            share: leftover,
        });

        const shares: PieShares = mutShares;
        shares.total = totalSlices;
        return shares;
    }
}
