import { inject, Injectable } from '@angular/core';
import { ApprovalBallot, Ballot, PluralityBallot, RankedBallot, ScoreBallot } from '../core/ballot';
import { VotingMethod } from '../core/voting-method';
import { Candidates } from './candidates';

export const BLANK_COLOR = "#bbb";
export interface PieShare {
    color: string;
    share: number;
}
export type PieShares = readonly PieShare[] & { total?: number };

@Injectable({
    providedIn: 'root',
})
export class Pies {
    readonly candidatesDisplayService = inject(Candidates);

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
        const shares: PieShares = [{ color: this.candidatesDisplayService.getColor(ballot), share: 1 }];
        shares.total = 1;
        return shares;
    }

    getRankedShares(ballot: RankedBallot): PieShares {
        const n = ballot.length;
        const shares: PieShares = ballot.map((candidate, index) => ({
            color: this.candidatesDisplayService.getColor(candidate),
            share: (n - index),
        }));
        shares.total = (n * (n + 1)) / 2;
        return shares;
    }

    getApprovalShares(ballot: ApprovalBallot): PieShares {
        const n = ballot.size;
        if (n === 0) {
            const shares: PieShares = [{ color: BLANK_COLOR, share: 1 }];
            shares.total = 1;
            return shares;
        }

        const shares: PieShares = Array.from(ballot, candidate => ({
            color: this.candidatesDisplayService.getColor(candidate),
            share: 1,
        }));
        shares.total = n;
        return shares;
    }

    getScoreShares(ballot: ScoreBallot, { numScores }: { numScores: number }): PieShares {
        const numScoresAdj = numScores - 1;
        const totalSlices = ballot.size * numScoresAdj;
        let leftover = totalSlices;

        const mutShares: PieShare[] = Array.from(ballot.entries(), ([candidate, score]) => [candidate, score-1] as const)
            .filter(([, scoreAdj]) => scoreAdj > 0)
            .map(([candidate, scoreAdj]) => {
                leftover -= scoreAdj;
                return {
                    color: this.candidatesDisplayService.getColor(candidate),
                    share: scoreAdj,
                };
            });
        mutShares.push({
            color: BLANK_COLOR,
            share: leftover,
        });

        const shares: PieShares = mutShares;
        shares.total = totalSlices;
        return shares;
    }
}
