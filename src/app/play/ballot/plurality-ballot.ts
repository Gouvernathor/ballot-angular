import { Component, inject, input } from '@angular/core';
import { PluralityBallot } from '../../core/ballot';
import { CandidateShape } from '../../core/candidate';
import { CandidatesDisplayService } from '../../display/candidates';
import { LANG } from '../../i18n/language.service';

@Component({
    selector: 'app-plurality-ballot',
    imports: [],
    templateUrl: './plurality-ballot.html',
    styleUrls: ["./common-ballots.scss", './plurality-ballot.scss'],
})
export class PluralityBallotComponent {
    readonly candidateDisplayService = inject(CandidatesDisplayService);
    readonly lang = inject(LANG);

    readonly ballot = input.required<PluralityBallot>();

    src(shape: CandidateShape) {
        const ballot = this.ballot();
        const checked = ballot.shape === shape;
        return checked ? "play/ballot/checked.webp" : "play/ballot/unchecked.webp";
    }

    getFullName(shape: CandidateShape): string {
        return this.candidateDisplayService.getLocalizedFullName(shape, this.lang);
    }
}
