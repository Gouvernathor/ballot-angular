import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { TranslateService } from './translate.service';

@Directive({
    selector: '[appReplaceInnerHTMLByKey]'
})
export class ReplaceInnerHTMLByKey {
    /*
    Get a translation id/key
    using a service, get the current language
    (either passed by URL, or from browser settings, or default)
    fetch the translation for that key in that language
    iff found, replace the innerHTML of the host element with that translation
    */

    private readonly renderer = inject(Renderer2);
    private readonly elementRef = inject(ElementRef<HTMLElement>);
    private readonly translateService = inject(TranslateService);

    readonly key = input.required<string>();

    private readonly originalInnerHTML = this.elementRef.nativeElement.innerHTML;

    constructor() {
        effect(() => {
            const element = this.elementRef.nativeElement;

            const translation = this.translateService.getTranslation(this.key());

            if (translation === undefined) {
                element.innerHTML = this.originalInnerHTML;
            } else {
                element.innerHTML = translation;
            }
        });
    }
}
