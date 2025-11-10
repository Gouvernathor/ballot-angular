import { Component, computed, inject, input } from '@angular/core';
import { Pies } from '../../../display/pies';
import { Opinions } from '../../../core/candidate';
import { VotingMethod } from '../../../core/voting-method';
import { Ballot } from '../../../core/ballot';
import { Pie } from "./pie";

@Component({
    selector: 'g[appGaussianVoter]',
    imports: [Pie],
    templateUrl: './gaussian-voter.html',
    styleUrl: './gaussian-voter.scss',
})
export class GaussianVoter {
    readonly piesService = inject(Pies);

    readonly votingMethod = input.required<VotingMethod<Ballot>>();
    readonly ballots = input.required<readonly Ballot[]>();
    readonly offsets = input.required<readonly Opinions[]>();

    readonly offsetsAndBallots = computed(() => {
        const ballots = this.ballots();
        return this.offsets().map((offset, index) => ({
            offset,
            ballot: ballots[index],
        }));
    });
}
