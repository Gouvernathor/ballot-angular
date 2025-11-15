import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-button-group',
    imports: [],
    templateUrl: './button-group.html',
    styleUrl: './button-group.scss',
})
export class ButtonGroup<T> {
    readonly question = input.required<string>();
    readonly options = input.required<{ name: string; value: T }[]>();
    readonly currentValue = input.required<T>();
    readonly choice = output<T>();
}
