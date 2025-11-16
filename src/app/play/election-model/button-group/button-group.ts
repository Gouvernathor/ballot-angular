import { Component, input, output } from '@angular/core';

export interface ButtonOption<T> {
    readonly name: string;
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
