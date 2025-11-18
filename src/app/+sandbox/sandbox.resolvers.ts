import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { Opinions } from "../core/candidate";

interface SandboxResolver {
    description: ResolveFn<string|undefined>;
    defaultElectionMethod: ResolveFn<string|undefined>;
    defaultCandidates: ResolveFn<readonly Opinions[]|undefined>;
    defaultVoterGroups: ResolveFn<readonly Opinions[]|undefined>;
}

function extractOpinionsArray(route: ActivatedRouteSnapshot, ...keys: string[]): readonly Opinions[]|undefined {
    const qpm = route.queryParamMap;
    for (const key of keys) {
        const values = qpm.getAll(key);
        if (values.length > 0) {
            return values
                .map(v => v.split(",").map(val => Number(val)))
                .filter((opinions): opinions is [number, number] => opinions.length === 2) as Opinions[];
        }
    }
    return undefined;
}

export const sandboxResolvers: SandboxResolver = {
    description: (route) => {
        const qpm = route.queryParamMap;
        return qpm.get("d") ?? qpm.get("description") ?? undefined;
    },
    defaultElectionMethod: (route) => {
        const qpm = route.queryParamMap;
        return qpm.get("s") ?? qpm.get("electionMethod") ?? undefined;
    },
    defaultCandidates: (route) => {
        return extractOpinionsArray(route, "c", "candidates");
    },
    defaultVoterGroups: (route) => {
        return extractOpinionsArray(route, "v", "voters");
    },
};
