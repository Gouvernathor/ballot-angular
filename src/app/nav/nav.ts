import { Component, inject, input } from '@angular/core';
import { BROWSER_PREF_LANG, LANG, SupportedLanguage } from '../i18n/language.service';
import { RouterLink } from "@angular/router";

interface LocalTranslation {
    routerLink: readonly string[];
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
    protected readonly lang = inject(LANG);
    protected readonly browserPrefLang = inject(BROWSER_PREF_LANG);

    readonly displayOriginalAndExternalTL = input(true);
    readonly originalLabel = input("Original");
    readonly translationsLabel = input("Translations:");
    readonly sourceCodeLabel = input("Full source code here!");

    protected readonly localTranslations: readonly LocalTranslation[] = [
        { routerLink: [ "" ], label: "English", lang: "en-CA" },
        { routerLink: [ "/fr-FR" ], label: "Français", lang: "fr-FR" },
    ];
}
