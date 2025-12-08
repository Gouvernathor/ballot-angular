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

const SHORT_NAMES: { readonly [l in SupportedLanguage]?: { readonly [k in CandidateShape]: string } } = {
    "fr-FR": {
        square: "Carré",
        triangle: "Triangle",
        hexagon: "Hexagone",
        pentagon: "Pentagone",
        bob: "Bob",
    },
}

const FULL_NAMES: { readonly [l in SupportedLanguage]?: { readonly [k in CandidateShape]: string } } = {
    "en-CA": {
        square: "Steven Square",
        triangle: "Tracy Triangle",
        hexagon: "Henry Hexagon",
        pentagon: "Percival Pentagon",
        bob: "Bob",
    },
    "fr-FR": {
        square: "Céline Carré",
        triangle: "Thomas Triangle",
        hexagon: "Henri Hexagone",
        pentagon: "Pascal Pentagone",
        bob: "Bob",
    },
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

    getLocalizedName(shape: CandidateShape, lang: SupportedLanguage): string {
        const shortNames = SHORT_NAMES[lang];
        if (shortNames) {
            return shortNames[shape];
        }

        if (lang === "en-CA") {
            // special case
            return shape;
        }

        return `${shape} (no tl for ${lang})`;
    }

    getLocalizedFullName(shape: CandidateShape, lang: SupportedLanguage): string {
        const fullNames = FULL_NAMES[lang];
        if (fullNames) {
            return fullNames[shape];
        }

        return `${shape} (no full-name tl for ${lang})`;
    }
}
