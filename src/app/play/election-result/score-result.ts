import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Candidate } from '../../core/candidate';
import { ScoreResultInformation } from '../../core/election';
import { CandidatesDisplayService } from '../../display/candidates';
import { LANG } from '../../i18n/language.service';

@Component({
    selector: 'app-score-result',
    imports: [DecimalPipe],
    templateUrl: './score-result.html',
    styleUrls: ["./election-results.scss", './score-result.scss'],
})
export class ScoreResult {
    readonly candidatesDisplayService = inject(CandidatesDisplayService);
    readonly lang = inject(LANG);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<ScoreResultInformation>();

    private readonly winner = computed(() => this.results().winner);
    readonly winnerColor = computed(() =>
        this.candidatesDisplayService.getColor(this.winner()));
    readonly winnerSrc = computed(() =>
        this.candidatesDisplayService.getIconImage(this.winner()));
    readonly winnerName = computed(() =>
        this.candidatesDisplayService.getLocalizedName(this.winner().shape, this.lang));
}
