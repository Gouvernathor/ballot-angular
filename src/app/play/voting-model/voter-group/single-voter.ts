import { Component, computed, input } from '@angular/core';
import { Pie } from './pie';
import { Ballot } from '../../../core/ballot';
import { VotingMethod } from '../../../core/voting-method';

@Component({
    selector: 'g[appSingleVoter]',
    imports: [Pie],
    templateUrl: './single-voter.html',
    styleUrl: './single-voter.scss',
})
export class SingleVoter {
    readonly votingMethod = input.required<VotingMethod<Ballot>>();
    readonly ballot = input.required<Ballot>();
}
