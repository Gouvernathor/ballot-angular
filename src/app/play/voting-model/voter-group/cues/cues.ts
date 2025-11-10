import { Component, computed, input, Signal } from '@angular/core';
import { VotingMethod } from '../../../../core/voting-method';
import { ApprovalBallot, Ballot, PluralityBallot, RankedBallot, ScoreBallot } from '../../../../core/ballot';
import { Opinions } from '../../../../core/candidate';

@Component({
    selector: 'g[appCues]',
    imports: [],
    templateUrl: './cues.html',
    styleUrl: './cues.scss',
})
export class Cues {
    readonly votingMethod = input.required<VotingMethod<Ballot>>();
    readonly voterOpinions = input.required<Opinions>();
    readonly ballot = input.required<Ballot>();

    readonly ballotAsPlurality = this.ballot as Signal<PluralityBallot>;
    readonly ballotAsRanked = this.ballot as Signal<RankedBallot>;
    readonly ballotAsApproval = this.ballot as Signal<ApprovalBallot>;
    readonly ballotAsScore = this.ballot as Signal<ScoreBallot>;

    *range(start: number, end: number) {
        for (let i = start; i < end; i++) {
            yield i;
        }
    }
}
