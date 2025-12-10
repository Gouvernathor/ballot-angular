import { Component, inject, input } from '@angular/core';
import { LANG, SupportedLanguage } from '../i18n/language.service';
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

    readonly originalLabel = input("Original");
    readonly translationsLabel = input("Translations:");
    readonly sourceCodeLabel = input("Full source code here!");

    readonly localTranslations: readonly LocalTranslation[] = [
        { routerLink: "", label: "English", lang: "en-CA" },
        { routerLink: "/fr-FR", label: "Français", lang: "fr-FR" },
    ];
}
