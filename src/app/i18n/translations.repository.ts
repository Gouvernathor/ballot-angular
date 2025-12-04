import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TranslationsRepository {
    readonly supportedLanguages = [
        "en-CA",
        "fr-FR",
        "ar",
        "ru",
    ] as const;
}
