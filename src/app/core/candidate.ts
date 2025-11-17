import { WritableSignal } from "@angular/core";

export type Opinions = readonly [number, number];
export interface HasOpinions {
    getOpinions(): Opinions;
}

export type CandidateShape =
    | "square"
    | "triangle"
    | "hexagon"
    | "pentagon"
    | "bob"
;

export interface Candidate extends HasOpinions {
    readonly shape: CandidateShape;
    readonly getOpinions: WritableSignal<Opinions>;
}
