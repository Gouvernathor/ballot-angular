import { Component, computed, inject, input } from '@angular/core';
import { CandidatesDisplayService } from '../../display/candidates';
import { Candidate } from '../../core/candidate';
import { CondorcetResultInformation } from '../../core/election';
import { LANG } from '../../i18n/language.service';

@Component({
    selector: 'app-condorcet-result',
    imports: [],
    templateUrl: './condorcet-result.html',
    styleUrls: ["./election-results.scss", './condorcet-result.scss'],
})
export class CondorcetResult {
    readonly candidatesDisplayService = inject(CandidatesDisplayService);
    readonly lang = inject(LANG);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<CondorcetResultInformation>();

    readonly winner = computed(() => this.results().winner);
}
