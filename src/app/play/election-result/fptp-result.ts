import { Component, inject, input } from '@angular/core';
import { Candidate } from '../../core/candidate';
import { Candidates } from '../../display/candidates';
import { FPTPResultInformation } from '../../core/election';

@Component({
    selector: 'app-fptp-result',
    imports: [],
    templateUrl: './fptp-result.html',
    styleUrls: ["./election-results.scss", './fptp-result.scss'],
})
export class FPTPResult {
    readonly candidateDisplayService = inject(Candidates);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<FPTPResultInformation>();

    readonly sidebar = input(false);
    readonly verbose = input(false);
}
