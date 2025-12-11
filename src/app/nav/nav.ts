import { Component, inject, input } from '@angular/core';
import { BROWSER_PREF_LANG, LANG, SupportedLanguage } from '../i18n/language.service';
import { RouterLink } from "@angular/router";

interface LocalTranslation {
    routerLink: string;
    label: string;
    lang: SupportedLanguage;
}

@Component({
    selector: '[app-nav]',
    imports: [RouterLink],
    templateUrl: './nav.html',
    styleUrl: './nav.scss',
})
export class Nav {
    readonly lang = inject(LANG);
    readonly browserPrefLang = inject(BROWSER_PREF_LANG);

    readonly originalLabel = input("Original");
    readonly translationsLabel = input("Translations:");
    readonly sourceCodeLabel = input("Full source code here!");

    readonly localTranslations: readonly LocalTranslation[] = [
        { routerLink: "", label: "English", lang: "en-CA" },
        { routerLink: "/fr-FR", label: "Français", lang: "fr-FR" },
    ];
}
