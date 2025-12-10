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
interface Shorter {
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
        const snapshotUrl = this.router.routerState.snapshot.url;
        const treeArray = [snapshotUrl.split('?')[0]];
        if (!snapshotUrl.includes("sandbox")) {
            treeArray.push("sandbox");
        }
        const tree = this.router.createUrlTree(treeArray, { queryParams: this.shorten(payload) });
        return new URL(
            this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(tree)),
            this.window.location.href,
        ).toString();
    }

    private shorten(source: SavePayload): Shorter {
        return {
            s: source.electionMethod,
            v: source.voters,
            c: source.candidates,
            d: source.description,
        };
    }
}
