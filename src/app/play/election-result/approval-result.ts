import { Component, inject, input } from '@angular/core';
import { ApprovalResultInformation } from '../../core/election';
import { Candidate } from '../../core/candidate';
import { CandidatesDisplayService } from '../../display/candidates';

@Component({
    selector: 'app-approval-result',
    imports: [],
    templateUrl: './approval-result.html',
    styleUrls: ["./election-results.scss", './approval-result.scss'],
})
export class ApprovalResult {
    readonly candidatesDisplayService = inject(CandidatesDisplayService);

    readonly candidates = input.required<readonly Candidate[]>();
    readonly results = input.required<ApprovalResultInformation>();
}
