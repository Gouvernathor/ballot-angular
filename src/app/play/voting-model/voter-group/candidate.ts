import { Component, inject, input } from '@angular/core';
import { Candidate } from '../../../core/candidate';
import { CandidatesDisplayService } from '../../../display/candidates';

@Component({
    selector: 'g[appCandidate]',
    imports: [],
    templateUrl: './candidate.html',
    styleUrl: './candidate.scss',
})
export class CandidateComponent {
    readonly candidatesService = inject(CandidatesDisplayService);

    readonly candidate = input.required<Candidate>();
}
