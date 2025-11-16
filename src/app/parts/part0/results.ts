import { Component, inject, input } from '@angular/core';
import { Candidate } from '../../core/candidate';
import { FPTPResultInformation } from '../../core/election';
import { CandidatesDisplayService } from '../../display/candidates';

@Component({
    selector: 'app-results-part0',
    imports: [],
    templateUrl: './results.html',
    styleUrl: './results.scss',
})
export class ResultsComponentPart0 {
    readonly candidateDisplayService = inject(CandidatesDisplayService);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<FPTPResultInformation>();

    readonly verbose = input(false);
}
