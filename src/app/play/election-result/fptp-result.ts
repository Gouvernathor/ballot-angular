import { Component, computed, inject, input } from '@angular/core';
import { Candidate } from '../../core/candidate';
import { CandidatesDisplayService } from '../../display/candidates';
import { FPTPResultInformation } from '../../core/election';
import { LANG } from '../../i18n/language.service';

@Component({
    selector: 'app-fptp-result',
    imports: [],
    templateUrl: './fptp-result.html',
    styleUrls: ["./election-results.scss", './fptp-result.scss'],
})
export class FPTPResult {
    readonly candidatesDisplayService = inject(CandidatesDisplayService);
    readonly lang = inject(LANG);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<FPTPResultInformation>();

    private readonly winner = computed(() => this.results().winner);
    readonly winnerColor = computed(() =>
        this.candidatesDisplayService.getColor(this.winner()));
    readonly winnerSrc = computed(() =>
        this.candidatesDisplayService.getIconImage(this.winner()));
    readonly winnerName = computed(() =>
        this.candidatesDisplayService.getLocalizedName(this.winner().shape, this.lang));
}
