import { Component, input } from '@angular/core';
import { PluralityBallot } from '../../core/ballot';
import { CandidateShape } from '../../core/candidate';

@Component({
    selector: 'app-plurality-ballot',
    imports: [],
    templateUrl: './plurality-ballot.html',
    styleUrls: ["./common-ballots.scss", './plurality-ballot.scss'],
})
export class PluralityBallotComponent {
    readonly ballot = input.required<PluralityBallot>();

    src(shape: CandidateShape) {
        const ballot = this.ballot();
        const checked = ballot.shape === shape;
        return checked ? "play/ballot/checked.webp" : "play/ballot/unchecked.webp";
        // TODO move this to CSS, and use a data attribute in HTML/TS
    }
}
