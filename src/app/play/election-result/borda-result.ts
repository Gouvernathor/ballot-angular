import { Component, computed, inject, input } from '@angular/core';
import { CandidatesDisplayService } from '../../display/candidates';
import { BordaResultInformation } from '../../core/election';
import { Candidate } from '../../core/candidate';
import { LANG } from '../../i18n/language.service';

@Component({
    selector: 'app-borda-result',
    imports: [],
    templateUrl: './borda-result.html',
    styleUrls: ["./election-results.scss", './borda-result.scss'],
})
export class BordaResult {
    readonly candidatesDisplayService = inject(CandidatesDisplayService);
    readonly lang = inject(LANG);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<BordaResultInformation>();

    private readonly winner = computed(() => this.results().winner);
    readonly winnerColor = computed(() =>
        this.candidatesDisplayService.getColor(this.winner()));
    readonly winnerSrc = computed(() =>
        this.candidatesDisplayService.getIconImage(this.winner()));
    readonly winnerName = computed(() =>
        this.candidatesDisplayService.getLocalizedName(this.winner().shape, this.lang));
}
