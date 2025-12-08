import { Component, computed, inject, input } from '@angular/core';
import { ApprovalResultInformation } from '../../core/election';
import { Candidate } from '../../core/candidate';
import { CandidatesDisplayService } from '../../display/candidates';
import { LANG } from '../../i18n/language.service';

@Component({
    selector: 'app-approval-result',
    imports: [],
    templateUrl: './approval-result.html',
    styleUrls: ["./election-results.scss", './approval-result.scss'],
})
export class ApprovalResult {
    readonly candidatesDisplayService = inject(CandidatesDisplayService);
    readonly lang = inject(LANG);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<ApprovalResultInformation>();

    private readonly winner = computed(() => this.results().winner);
    readonly winnerColor = computed(() =>
        this.candidatesDisplayService.getColor(this.winner()));
    readonly winnerSrc = computed(() =>
        this.candidatesDisplayService.getIconImage(this.winner()));
    readonly winnerName = computed(() =>
        this.candidatesDisplayService.getLocalizedName(this.winner().shape, this.lang));
}
