import { Injectable } from '@angular/core';
import { Candidate } from '../core/candidate';

const COLORS: { [k in Candidate["shape"]]: string } = {
    square: "hsl(240, 80%, 70%)",
    triangle: "hsl(45, 80%, 70%)",
    hexagon: "hsl(0, 80%, 70%)",
    pentagon: "hsl(90, 80%, 70%)",
    bob: "hsl(30, 80%, 70%)",
};

@Injectable({
    providedIn: 'root',
})
export class Candidates {
    getColor(candidate: Candidate): string {
        return COLORS[candidate.shape];
    }

    getModelImage(candidate: Candidate): string {
        return `${candidate.shape}.svg`;
    }
}
