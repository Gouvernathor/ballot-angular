import { Injectable } from "@angular/core";
import { ReadonlyCounter } from "@gouvernathor/python/collections";
import { Candidate } from "./candidate";

@Injectable({
    providedIn: "root",
})
export class AttributionService {
    extractSingleWinnerFromAttribution(attribution: ReadonlyCounter<Candidate, number>): Candidate {
        if (attribution.size !== 1) {
            throw new Error("The attribution does not contain exactly one winner");
        }
        const candidate = attribution.keys().next().value!;
        if (attribution.get(candidate) !== 1) {
            throw new Error("The attribution does not assign exactly one seat to the winner");
        }
        return candidate;
    }
}
