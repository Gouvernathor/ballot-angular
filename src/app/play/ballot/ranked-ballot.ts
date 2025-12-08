import { Component, inject, input } from '@angular/core';
import { RankedBallot } from '../../core/ballot';
import { CandidateShape } from '../../core/candidate';
import { CandidatesDisplayService } from '../../display/candidates';
import { LANG } from '../../i18n/language.service';

@Component({
    selector: 'app-ranked-ballot',
    imports: [],
    templateUrl: './ranked-ballot.html',
    styleUrls: ["./common-ballots.scss", './ranked-ballot.scss'],
})
export class RankedBallotComponent {
    readonly candidateDisplayService = inject(CandidatesDisplayService);
    readonly lang = inject(LANG);

    readonly ballot = input.required<RankedBallot>();

    src(shape: CandidateShape) {
        const ballot = this.ballot();
        const index = ballot.findIndex(c => c.shape === shape);
        return `play/ballot/${index+1}.webp`;
    }

    getFullName(shape: CandidateShape): string {
        return this.candidateDisplayService.getLocalizedFullName(shape, this.lang);
    }
}
