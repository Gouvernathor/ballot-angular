import { Component, input, linkedSignal, signal } from '@angular/core';
import { Candidate, CandidateShape } from '../../core/candidate';
import { GaussianVoters } from '../../core/voter-group';

export enum ElectionModelFeatures {
    Basic = 1,
    Voters,
    VotersAndCandidates,
    VotersAndCandidatesAndSave,
}

// election methods : FPTP, IRV, Borda, Condorcet, Approval, Score

export function makeDefaultCandidates(numCandidates: 1|2|3|4|5 = 3): Candidate[] {
    const shapes: CandidateShape[] = ["square", "triangle", "hexagon", "pentagon", "bob"];
    const startAngle =
        numCandidates === 3 ?
            Math.PI / 6 :
        numCandidates === 4 ?
            Math.PI / 4 :
        numCandidates === 5 ?
            Math.PI / 3.3 :
            0;
    const candidates: Candidate[] = [];
    const radius = 100;
    for (let i = 0; i < numCandidates; i++) {
        const shape = shapes[i];
        const angle = startAngle + (i * 2 * Math.PI / numCandidates);
        const x = 150 + radius * Math.cos(angle);
        const y = 150 + radius * Math.sin(angle);
        candidates.push({ shape, getOpinions: signal([x, y]) });
    }
    return candidates;
}

export function makeDefaultVoterGroups(numVoterGroups: 1|2|3 = 1): ReadonlySet<GaussianVoters> {
    switch (numVoterGroups) {
        case 1:
            return new Set([
                new GaussianVoters(signal([150, 150]), { num: 3 }),
            ]);
        case 2:
            return new Set([
                new GaussianVoters(signal([150, 100]), { num: 2 }),
                new GaussianVoters(signal([150, 200]), { num: 2 }),
            ]);
        case 3:
            return new Set([
                new GaussianVoters(signal([150, 115]), { num: 1 }),
                new GaussianVoters(signal([115, 180]), { num: 1 }),
                new GaussianVoters(signal([185, 180]), { num: 1 }),
            ]);
    }
}

@Component({
    selector: 'app-election-model',
    imports: [],
    templateUrl: './election-model.html',
    styleUrl: './election-model.scss',
})
export class ElectionModel {
    readonly features = input(ElectionModelFeatures.Basic);
    readonly defaultElectionMethod = input<unknown>("FPTP");
    readonly candidates = input(makeDefaultCandidates());
    readonly voterGroups = input(makeDefaultVoterGroups());

    readonly electionMethod = linkedSignal<unknown>(() => this.defaultElectionMethod());
}
