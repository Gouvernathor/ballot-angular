import { computed, DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    private readonly window = inject(DOCUMENT).defaultView;
    private readonly route = inject(ActivatedRoute);

    private readonly routeData = toSignal(this.route.data);
    private readonly routeLanguage = computed(() => this.routeData()?.["lang"] as string | undefined);

    readonly supportedLanguages = [
        "en-CA",
        "fr-FR",
        "ar",
        "ru",
    ] as const;
    private readonly bareLanguages = this.supportedLanguages.map(lang => lang.split("-")[0]);

    private browserChosenLanguage(): string | undefined {
        const nav = this.window?.navigator;

        if (nav?.languages?.length) {
            for (const lang of nav.languages) {
                const bare = lang.split("-")[0];
                const matched = this.supportedLanguages.find(supported => supported === lang)
                    ?? this.bareLanguages.find(supported => supported === bare);
                if (matched) {
                    return matched;
                }
            }
        }

        return nav?.language;
    }
    private readonly browserLanguage = signal(this.browserChosenLanguage());
    constructor() {
        this.window?.addEventListener("languagechange", () => {
            this.browserLanguage.set(this.browserChosenLanguage());
        });
    }

    readonly currentLanguage = computed(() => this.routeLanguage() ?? this.browserLanguage() ?? this.supportedLanguages[0]);
}
