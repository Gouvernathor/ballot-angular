import { Component, inject, input } from '@angular/core';
import { CandidatesDisplayService } from '../../display/candidates';
import { Candidate } from '../../core/candidate';
import { CondorcetResultInformation } from '../../core/election';

@Component({
    selector: 'app-condorcet-result',
    imports: [],
    templateUrl: './condorcet-result.html',
    styleUrls: ["./election-results.scss", './condorcet-result.scss'],
})
export class CondorcetResult {
    readonly candidatesDisplayService = inject(CandidatesDisplayService);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<CondorcetResultInformation>();
}
