import { Component, computed, inject, input } from '@angular/core';
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

    readonly customPageRoute = input<readonly string[]>([]);
    protected readonly displayAdditionalLinks = computed(() => !this.customPageRoute().length);

    protected readonly localTranslations = computed<readonly LocalTranslation[]>(() => [
        { routerLink: [ "" ].concat(this.customPageRoute()), label: "English", lang: "en-CA" },
        { routerLink: [ "/fr-FR" ].concat(this.customPageRoute()), label: "Français", lang: "fr-FR" },
    ]);
}
