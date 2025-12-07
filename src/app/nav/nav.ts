import { Component, input } from '@angular/core';

@Component({
    selector: '[app-nav]',
    imports: [],
    templateUrl: './nav.html',
    styleUrl: './nav.scss',
})
export class Nav {
    readonly originalLabel = input("Original");
    readonly sourceCodeLabel = input("Full source code here!");
}
