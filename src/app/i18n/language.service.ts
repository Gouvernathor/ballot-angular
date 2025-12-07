import { DOCUMENT, inject, Injectable, InjectionToken, signal } from '@angular/core';

const supportedLanguages = [
    "en-CA",
    "fr-FR",
    "ar",
    "ru",
] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

/**
 * The current language.
 * Set for every route by the router.
 * Injectable only in components (those routed to by the router, and their children).
 */
export const LANG = new InjectionToken<SupportedLanguage>("LANG");

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    private readonly window = inject(DOCUMENT).defaultView;

    private browserChosenLanguage(): SupportedLanguage | undefined {
        const nav = this.window?.navigator;

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
    private readonly browserLanguage = signal(this.browserChosenLanguage());
    constructor() {
        this.window?.addEventListener("languagechange", () => {
            this.browserLanguage.set(this.browserChosenLanguage());
        });
    }
}
