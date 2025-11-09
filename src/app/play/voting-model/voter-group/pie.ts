import { Component, input } from '@angular/core';
import { Ballot } from '../../../core/ballot';

@Component({
    selector: 'g[appPie]',
    imports: [],
    templateUrl: './pie.html',
    styleUrl: './pie.scss',
})
export class Pie {
    readonly size = input.required<number>();
    readonly ballot = input.required<Ballot>();
}
