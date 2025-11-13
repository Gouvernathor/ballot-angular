import { Component, input } from '@angular/core';
import { ApprovalBallot } from '../../core/ballot';
import { CandidateShape } from '../../core/candidate';

@Component({
    selector: 'app-approval-ballot',
    imports: [],
    templateUrl: './approval-ballot.html',
    styleUrls: ["./common-ballots.scss", './approval-ballot.scss'],
})
export class ApprovalBallotComponent {
    readonly ballot = input.required<ApprovalBallot>();

    src(shape: CandidateShape) {
        const ballot = this.ballot();
        const checked = Array.from(ballot, s => s.shape).includes(shape);
        return checked ? "play/ballot/checked.webp" : "play/ballot/unchecked.webp";
    }
}
