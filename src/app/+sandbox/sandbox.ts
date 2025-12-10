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

    // Because of the quote " around BOB, this can't be written inline in the HTML
    readonly queryParams4 = {
        s: "IRV",
        v: [[150, 150]],
        c: [[197, 149], [150, 104], [150, 195], [106, 149], [150, 152]],
        d: `IRV's Silly Non-Monotonicity: Move Circle ("BOB") around the other 4 candidates, and watch how the results flip chaotically between them, but never to Bob!`,
    };
}
