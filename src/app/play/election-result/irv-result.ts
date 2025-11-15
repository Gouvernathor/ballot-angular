import { Component, inject, input } from '@angular/core';
import { CandidatesDisplayService } from '../../display/candidates';
import { IRVResultInformation } from '../../core/election';
import { Candidate } from '../../core/candidate';

@Component({
    selector: 'app-irv-result',
    imports: [],
    templateUrl: './irv-result.html',
    styleUrls: ["./election-results.scss", './irv-result.scss'],
})
export class IrvResult {
    readonly candidatesDisplayService = inject(CandidatesDisplayService);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<IRVResultInformation>();
}
