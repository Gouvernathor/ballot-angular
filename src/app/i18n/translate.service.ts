import { inject, Injectable } from '@angular/core';
import { SupportedLanguage, TranslationsRepository } from './translations.repository';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private readonly translationsRepository = inject(TranslationsRepository);
    private readonly languageService = inject(LanguageService);

    /**
     * This should only be called directly from a signal/computed context
     * for optimization reasons.
     */
    getTranslation(key: string, lang: SupportedLanguage = this.languageService.currentLanguage()): string | undefined {
        let store = this.translationsRepository.getLanguageStore(lang);
        while (store && key) {
            const value = store[key];
            if (typeof value === "string") {
                return value;
            } else if (typeof value === "object" && value !== null) {
                // exact match, does not point to a key
                return undefined;
            }

            // no match, try nested key
            const parts = key.split(".", 2);
            store = store[parts[0]] as any;
            key = parts[1];
        }
        return undefined;
    }
}
