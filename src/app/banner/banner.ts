import { Component, input } from '@angular/core';
import { Splash } from "../splash/splash";

@Component({
    selector: 'app-banner',
    imports: [Splash],
    templateUrl: './banner.html',
    styleUrl: './banner.scss',
})
export class Banner {
    readonly splash = input(false);
}
