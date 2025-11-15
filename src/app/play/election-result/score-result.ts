import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Candidate } from '../../core/candidate';
import { ScoreResultInformation } from '../../core/election';
import { CandidatesDisplayService } from '../../display/candidates';

@Component({
    selector: 'app-score-result',
    imports: [DecimalPipe],
    templateUrl: './score-result.html',
    styleUrls: ["./election-results.scss", './score-result.scss'],
})
export class ScoreResult {
    readonly candidatesDisplayService = inject(CandidatesDisplayService);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<ScoreResultInformation>();
}
