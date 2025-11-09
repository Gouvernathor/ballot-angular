import { Component, input } from '@angular/core';
import { Ballot } from '../../../core/ballot';
import { VotingMethod } from '../../../core/voting-method';

@Component({
    selector: 'g[appPie]',
    imports: [],
    templateUrl: './pie.html',
    styleUrl: './pie.scss',
})
export class Pie {
    readonly size = input.required<number>();
    readonly votingMethod = input.required<VotingMethod<Ballot>>();
    readonly ballot = input.required<Ballot>();
}
