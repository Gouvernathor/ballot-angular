import { Component, input } from '@angular/core';
import { Splash } from "../splash/splash";

@Component({
    selector: 'app-banner',
    imports: [Splash],
    templateUrl: './banner.html',
    styleUrl: './banner.scss',
})
export class Banner {
    readonly title1 = input<string>();
    readonly title2 = input<string>();
    readonly comment = input<string>();
}
