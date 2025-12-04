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

async function getLanguageStore(lang: SupportedLanguage) {
    return await (import(`../assets/tl/${lang}.json`) as Promise<TranslationStore>);
}
function* makeMainStoreEntries() {
    for (const lang of supportedLanguages) {
        yield (async () => [lang, await getLanguageStore(lang)] as const)();
    }
}
async function makeMainStore() {
    const a = await Promise.all(makeMainStoreEntries());
    return Object.fromEntries(a) as TranslationsStore;
}
const mainStore: TranslationsStore = await makeMainStore();

@Injectable({
    providedIn: 'root',
})
export class TranslationsRepository {
    readonly supportedLanguages = supportedLanguages;
}
