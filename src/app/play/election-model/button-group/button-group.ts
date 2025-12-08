import { Component, input, output } from '@angular/core';

export interface ButtonNameAbbr {
    readonly full: string;
    readonly short: string;
}
export type ButtonName = string | ButtonNameAbbr;
export interface ButtonOption<T> {
    readonly name: ButtonName;
    readonly value: T;
}

@Component({
    selector: 'app-button-group',
    imports: [],
    templateUrl: './button-group.html',
    styleUrl: './button-group.scss',
})
export class ButtonGroup<T> {
    readonly question = input.required<string>();
    readonly options = input.required<readonly ButtonOption<T>[]>();
    readonly currentValue = input.required<T>();
    readonly choice = output<T>();
    readonly buttonMinWidth = input<string>();
}
