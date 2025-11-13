import { Component, input } from '@angular/core';
import { RankedBallot } from '../../core/ballot';

@Component({
    selector: 'app-ranked-ballot',
    imports: [],
    templateUrl: './ranked-ballot.html',
    styleUrl: './ranked-ballot.scss',
})
export class RankedBallotComponent {
    readonly ballot = input.required<RankedBallot>();
}
