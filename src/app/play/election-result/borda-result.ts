import { Component, inject, input } from '@angular/core';
import { CandidatesDisplayService } from '../../display/candidates';
import { BordaResultInformation } from '../../core/election';
import { Candidate } from '../../core/candidate';

@Component({
    selector: 'app-borda-result',
    imports: [],
    templateUrl: './borda-result.html',
    styleUrls: ["./election-results.scss", './borda-result.scss'],
})
export class BordaResult {
    readonly candidatesDisplayService = inject(CandidatesDisplayService);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<BordaResultInformation>();
}
