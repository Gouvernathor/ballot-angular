import { Component, inject, input } from '@angular/core';
import { Candidate } from '../../../core/candidate';
import { Candidates } from '../../../display/candidates';

@Component({
    selector: 'g[appCandidate]',
    imports: [],
    templateUrl: './candidate.html',
    styleUrl: './candidate.scss',
})
export class CandidateComponent {
    readonly candidatesService = inject(Candidates);

    readonly candidate = input.required<Candidate>();
}
