import { inject, Injectable } from '@angular/core';
import { SupportedLanguage, TranslationsRepository } from './translations.repository';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private readonly translationsRepository = inject(TranslationsRepository);
    private readonly languageService = inject(LanguageService);

    doesKeyExist(key: string, lang: SupportedLanguage = this.languageService.currentLanguage()): boolean {
        const store = this.translationsRepository.getLanguageStore(lang);
        const val = store[key];
        return typeof val === "string";
    }

    /**
     * This should only be called directly from a signal/computed context
     * for optimization reasons.
     */
    getTranslation(key: string, lang: SupportedLanguage = this.languageService.currentLanguage()): string | undefined {
        let store = this.translationsRepository.getLanguageStore(lang);
        while (key) {
            const value = store[key];
            if (typeof value === "string") {
                return value;
            } else if (typeof value === "object" && value !== null) {
                key = key.split(".", 2)[1];
                store = value as any;
            } else {
                return undefined;
            }
        }
        return undefined;
    }
}
