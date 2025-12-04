import { Injectable } from '@angular/core';

const supportedLanguages = [
    "en-CA",
    "fr-FR",
    "ar",
    "ru",
] as const;
type SupportedLanguage = (typeof supportedLanguages)[number];

type TranslationStore = {
    [key in string]?: string | TranslationStore;
}
type TranslationsStore = {
    [key in SupportedLanguage]: TranslationStore;
}

function getLanguageStore(lang: SupportedLanguage) {
    return import(`../assets/tl/${lang}.json`) as Promise<TranslationStore>;
}
function* makeMainStoreEntries() {
    for (const lang of supportedLanguages) {
        yield getLanguageStore(lang).then(store => [lang, store] as const);
    }
}
const mainStore = Object.fromEntries(await Promise.all(makeMainStoreEntries())) as TranslationsStore;

@Injectable({
    providedIn: 'root',
})
export class TranslationsRepository {
    readonly supportedLanguages = supportedLanguages;
}
