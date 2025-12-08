import { Injectable } from '@angular/core';
import { SupportedLanguage } from '../i18n/language.service';

type QuestionKey = "election" | "nvoters" | "ncandidates";
const QUESTIONS: { [k in SupportedLanguage]?: { [k in QuestionKey]: string } } = {
    "en-CA": {
        election: "what voting system?",
        nvoters: "how many groups of voters?",
        ncandidates: "how many candidates?",
    },
    "fr-FR": {
        election: "quel règle électorale ?",
        nvoters: "combien de groupes d'électeurs ?",
        ncandidates: "combien de candidats ?",
    },
};

@Injectable({
    providedIn: 'root',
})
export class ElectionModelTlService {
    getQuestion(key: QuestionKey, lang: SupportedLanguage): string {
        return QUESTIONS[lang]?.[key]
            ?? (console.error(`Missing translation for ${key} in ${lang}`), QUESTIONS["en-CA"]![key] + " TL MISSING");
    }
}
