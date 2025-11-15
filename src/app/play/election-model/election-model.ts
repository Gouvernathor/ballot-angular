import { Component, inject, input, linkedSignal } from '@angular/core';
import { ElectionMethodId, ElectionService } from '../../core/election';

export enum ElectionModelFeatures {
    Basic = 1,
    Voters,
    VotersAndCandidates,
    VotersAndCandidatesAndSave,
}

@Component({
    selector: 'app-election-model',
    imports: [],
    templateUrl: './election-model.html',
    styleUrl: './election-model.scss',
})
export class ElectionModel {
    readonly electionService = inject(ElectionService);

    readonly features = input(ElectionModelFeatures.Basic);
    readonly defaultElectionMethod = input<ElectionMethodId>("FPTP");
    readonly candidates = input(this.electionService.makeDefaultCandidates());
    readonly voterGroups = input(this.electionService.makeDefaultVoterGroups());

    readonly electionMethod = linkedSignal<ElectionMethodId>(() => this.defaultElectionMethod());
}
