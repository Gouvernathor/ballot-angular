import { Injectable } from '@angular/core';
import { Candidate, CandidateShape } from '../core/candidate';
import { SupportedLanguage } from '../i18n/language.service';

const COLORS: { readonly [k in CandidateShape]: string } = {
    square: "hsl(240, 80%, 70%)",
    triangle: "hsl(45, 80%, 70%)",
    hexagon: "hsl(0, 80%, 70%)",
    pentagon: "hsl(90, 80%, 70%)",
    bob: "hsl(30, 80%, 70%)",
};

const EN_CA_FULL_NAMES: { readonly [k in CandidateShape]: string } = {
    square: "Steven Square",
    triangle: "Tracy Triangle",
    hexagon: "Henry Hexagon",
    pentagon: "Percival Pentagon",
    bob: "Bob",
};

const FR_FR_NAMES: { readonly [k in CandidateShape]: string } = {
    square: "Carré",
    triangle: "Triangle",
    hexagon: "Hexagone",
    pentagon: "Pentagone",
    bob: "Bob",
};

const FR_FR_FULL_NAMES: { readonly [k in CandidateShape]: string } = {
    square: "Céline Carré",
    triangle: "Thomas Triangle",
    hexagon: "Henri Hexagone",
    pentagon: "Pascal Pentagone",
    bob: "Bob",
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

    getLocalizedName(candidate: Candidate, lang: SupportedLanguage): string {
        switch (lang) {
            case "en-CA":
                return candidate.shape;
            case "fr-FR":
                return FR_FR_NAMES[candidate.shape];
            default:
                return `${candidate.shape} (no tl for ${lang})`;
        }
    }

    getLocalizedFullName(candidate: Candidate, lang: SupportedLanguage): string {
        switch (lang) {
            case "en-CA":
                return EN_CA_FULL_NAMES[candidate.shape];
            case "fr-FR":
                return FR_FR_FULL_NAMES[candidate.shape];
            default:
                return `${candidate.shape} (no full-name tl for ${lang})`;
        }
    }
}
