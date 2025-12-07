import { Injectable } from '@angular/core';
import { Candidate, CandidateShape } from '../core/candidate';

const COLORS: { readonly [k in CandidateShape]: string } = {
    square: "hsl(240, 80%, 70%)",
    triangle: "hsl(45, 80%, 70%)",
    hexagon: "hsl(0, 80%, 70%)",
    pentagon: "hsl(90, 80%, 70%)",
    bob: "hsl(30, 80%, 70%)",
};

@Injectable({
    providedIn: 'root',
})
export class CandidatesDisplayService {
    getColor(candidate: Candidate): string {
        return COLORS[candidate.shape];
    }

    getCondorcetFailureColor(): string {
        return "#000";
    }

    getModelImage(candidate: Candidate): string {
        return `${candidate.shape}.svg`;
    }

    getIconImage(candidate: Candidate): string {
        return `play/icon/${candidate.shape}.svg`;
    }
}
