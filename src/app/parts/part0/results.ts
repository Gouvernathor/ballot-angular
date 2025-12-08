import { Component, computed, inject, input } from '@angular/core';
import { Candidate } from '../../core/candidate';
import { FPTPResultInformation } from '../../core/election';
import { CandidatesDisplayService } from '../../display/candidates';
import { LANG } from '../../i18n/language.service';

@Component({
    selector: 'app-results-part0',
    imports: [],
    templateUrl: './results.html',
    styleUrl: './results.scss',
})
export class ResultsComponentPart0 {
    readonly candidateDisplayService = inject(CandidatesDisplayService);
    readonly lang = inject(LANG);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<FPTPResultInformation>();

    readonly verbose = input(false);

    readonly winner = computed(() =>
        this.results().winner);
    readonly winnerColor = computed(() =>
        this.candidateDisplayService.getColor(this.winner()));

    getName(candidate: Candidate) {
        return this.candidateDisplayService.getLocalizedName(candidate.shape, this.lang);
    }
}
