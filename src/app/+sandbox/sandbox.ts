import { Component, computed, input } from '@angular/core';
import { ElectionModel, ElectionModelFeatures } from "../play/election-model/election-model";
import { Opinions } from '../core/candidate';
import { isElectionMethodId } from '../core/election';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-sandbox',
    imports: [ElectionModel, RouterLink],
    templateUrl: './sandbox.html',
    styleUrl: './sandbox.scss',
})
export class Sandbox {
    readonly description = input.required<string|undefined>();
    readonly ElectionModelFeatures = ElectionModelFeatures; // Expose enum to template
    readonly defaultElectionMethod = input.required<string|undefined>();
    readonly curatedDefaultElectionMethod = computed(() => {
        const candidate = this.defaultElectionMethod();
        return isElectionMethodId(candidate) ? candidate : "FPTP";
    });
    readonly defaultCandidates = input.required<readonly Opinions[]|undefined>();
    readonly defaultVoterGroups = input.required<readonly Opinions[]|undefined>();
}
