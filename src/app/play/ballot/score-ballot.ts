import { Component, inject, input } from '@angular/core';
import { ScoreBallot } from '../../core/ballot';
import { CandidateShape } from '../../core/candidate';
import { CandidatesDisplayService } from '../../display/candidates';
import { LANG } from '../../i18n/language.service';

@Component({
    selector: 'app-score-ballot',
    imports: [],
    templateUrl: './score-ballot.html',
    styleUrls: ["./common-ballots.scss", './score-ballot.scss'],
})
export class ScoreBallotComponent {
    readonly candidateDisplayService = inject(CandidatesDisplayService);
    readonly lang = inject(LANG);

    readonly ballot = input.required<ScoreBallot>();

    src(shape: string) {
        const ballot = this.ballot();
        const score = Array.from(ballot, ([c, score]) => ({ s: c.shape, score }))
            .find(({ s }) => s === shape)!.score;
        return `play/ballot/range${score}.webp`;
    }

    getName(shape: CandidateShape): string {
        return this.candidateDisplayService.getLocalizedName(shape, this.lang);
    }

    getFullName(shape: CandidateShape): string {
        return this.candidateDisplayService.getLocalizedFullName(shape, this.lang);
    }
}
