import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Opinions } from '../core/candidate';
import { LocationStrategy } from '@angular/common';

/**
 * The data that is saved and loaded.
 */
interface SavePayload {
    /** key: "s" */
    readonly electionMethod: string;
    /** key: "v" */
    readonly voters: readonly Opinions[];
    /** key: "c" */
    readonly candidates: readonly Opinions[];
    /** key: "d" */
    readonly description: string;
}
interface Intermediary {
    readonly s: SavePayload['electionMethod'];
    readonly v: SavePayload['voters'];
    readonly c: SavePayload['candidates'];
    readonly d: SavePayload['description'];
}

@Injectable({
    providedIn: 'root',
})
export class SaveService {
    readonly router = inject(Router);
    readonly locationStrategy = inject(LocationStrategy);
    readonly window = inject(DOCUMENT).defaultView!;

    getUrl(payload: SavePayload): string {
        const tree = this.router.createUrlTree(["sandbox"], { queryParams: payload });
        return new URL(
            this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(tree)),
            this.window.location.href,
        ).toString();
    }

    private shorten(source: SavePayload): Intermediary {
        return {
            s: source.electionMethod,
            v: source.voters,
            c: source.candidates,
            d: source.description,
        };
    }
}
