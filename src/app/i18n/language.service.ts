import { computed, DOCUMENT, inject, Injectable, InjectionToken, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

const supportedLanguages = [
    "en-CA",
    "fr-FR",
    "ar",
    "ru",
] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const LANG = new InjectionToken<() => SupportedLanguage>("LANG", { factory() {
    const route = inject(ActivatedRoute);
    const routeData = toSignal(route.data);
    return computed(() => {
        const lang = routeData()?.["lang"] as SupportedLanguage | undefined;
        return lang ?? "en-CA";
    });
}});

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    private readonly window = inject(DOCUMENT).defaultView;
    private readonly routeLanguage = inject(LANG);

    readonly supportedLanguages = supportedLanguages;

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

    readonly currentLanguage = computed(() => this.routeLanguage() ?? this.browserLanguage() ?? supportedLanguages[0]);
}
