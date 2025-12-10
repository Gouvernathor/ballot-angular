import { DOCUMENT, inject, InjectionToken, signal } from '@angular/core';

const supportedLanguages = [
    "en-CA",
    "fr-FR",
    // "ar",
    // "ru",
] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];


/**
 * The current language.
 * Set for every route by the router.
 * Injectable only in components (those routed to by the router, and their children).
 */
export const LANG = new InjectionToken<SupportedLanguage>("LANG");


function getBrowserChosenLanguage(nav: Navigator): SupportedLanguage|undefined {
    if (nav?.languages?.length) {
        for (const lang of nav.languages) {
            const bare = lang.split("-")[0];
            const matched = supportedLanguages.find(supported =>
                supported === lang || supported.split("-")[0] === bare);
            if (matched) {
                return matched;
            }
        }
    }

    const language = nav?.language;
    const bare = language?.split("-")[0];
    return supportedLanguages.find(supported =>
        supported === language || supported.split("-")[0] === bare);
}
function makeBrowserPrefLangSignal(): () => SupportedLanguage|undefined {
    const window = inject(DOCUMENT).defaultView;
    if (window) {
        const nav = window.navigator;

        const langSignal = signal(getBrowserChosenLanguage(nav));
        window.addEventListener("languagechange", () => {
            langSignal.set(getBrowserChosenLanguage(nav));
        });

        return langSignal;
    }
    return () => undefined;
}

export const BROWSER_PREF_LANG = new InjectionToken<() => SupportedLanguage|undefined>("BROWSER_PREF_LANG", {
    factory: makeBrowserPrefLangSignal,
});
