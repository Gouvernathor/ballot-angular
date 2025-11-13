import { Component, input } from '@angular/core';
import { RankedBallot } from '../../core/ballot';
import { CandidateShape } from '../../core/candidate';

@Component({
    selector: 'app-ranked-ballot',
    imports: [],
    templateUrl: './ranked-ballot.html',
    styleUrls: ["./common-ballots.scss", './ranked-ballot.scss'],
})
export class RankedBallotComponent {
    readonly ballot = input.required<RankedBallot>();

    src(shape: CandidateShape) {
        const ballot = this.ballot();
        const index = ballot.findIndex(c => c.shape === shape);
        return `play/ballot/${index+1}.webp`;
    }
}
