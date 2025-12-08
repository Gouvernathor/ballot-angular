import { Injectable } from '@angular/core';
import { SupportedLanguage } from '../i18n/language.service';
import { ElectionMethodId } from '../core/election';
import { ButtonName } from '../play/election-model/button-group/button-group';

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

const ELECTION_METHOD_NAMES: { [k in SupportedLanguage]?: { [k in ElectionMethodId]: ButtonName } } = {
    "fr-FR": {
        FPTP: {
            full: "Scrutin uninominal majoritaire à un tour",
            short: "SUM 1T",
        },
        IRV: {
            full: "Vote à second tour instantané",
            short: "VSTI/IRV",
        },
        Borda: "Borda",
        Condorcet: "Condorcet",
        Approval: "Approbation",
        Score: "Notes",
    },
};

const NUMBERS: { [k in SupportedLanguage]?: { [n in 1|2|3|4|5]: string } } = {
    "en-CA": [, "one", "two", "three", "four", "five" ] as const,
    "fr-FR": [, "un", "deux", "trois", "quatre", "cinq" ] as const,
};

@Injectable({
    providedIn: 'root',
})
export class ElectionModelTlService {
    getQuestion(key: QuestionKey, lang: SupportedLanguage): string {
        const questions = QUESTIONS[lang];
        if (questions) {
            return questions[key];
        }

        console.error(`Missing translation for ${key} in ${lang}`)
        return QUESTIONS["en-CA"]![key] + " TL MISSING";
    }

    getElectionMethodName(methodId: ElectionMethodId, lang: SupportedLanguage): ButtonName {
        const names = ELECTION_METHOD_NAMES[lang];
        if (names) {
            return names[methodId];
        }

        if (lang === "en-CA") {
            // special case
            return methodId;
        }

        console.error(`Missing translation for ${methodId} in ${lang}`);
        return `${methodId} (no tl for ${lang})`;
    }

    getNumberName(n: 1|2|3|4|5, lang: SupportedLanguage): string {
        const numbers = NUMBERS[lang];
        if (numbers) {
            return numbers[n];
        }

        console.error(`Missing translation for number ${n} in ${lang}`);
        return n.toString();
    }
}
