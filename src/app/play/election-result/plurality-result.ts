import { Component, inject, input } from '@angular/core';
import { Candidate } from '../../core/candidate';
import { Candidates } from '../../display/candidates';
import { Simple } from 'ecclesia/election/ballots';
import { FPTPResultInformation } from '../../core/election';

@Component({
    selector: 'app-plurality-result',
    imports: [],
    templateUrl: './plurality-result.html',
    styleUrls: ["./election-results.scss", './plurality-result.scss'],
})
export class PluralityResult {
    readonly candidateDisplayService = inject(Candidates);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<FPTPResultInformation>();

    readonly sidebar = input(false);
    readonly verbose = input(false);
}
