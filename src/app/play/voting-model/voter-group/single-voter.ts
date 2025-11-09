import { Component, computed, inject, input } from '@angular/core';
import { Pie } from './pie';
import { Ballot } from '../../../core/ballot';
import { VotingMethod } from '../../../core/voting-method';
import { Pies } from '../../../display/pies';

@Component({
    selector: 'g[appSingleVoter]',
    imports: [Pie],
    templateUrl: './single-voter.html',
    styleUrl: './single-voter.scss',
})
export class SingleVoter {
    readonly piesService = inject(Pies);

    readonly votingMethod = input.required<VotingMethod<Ballot>>();
    readonly ballot = input.required<Ballot>();
    readonly pieShares = computed(() =>
        this.piesService.getPieShares(this.votingMethod(), this.ballot()));
}
