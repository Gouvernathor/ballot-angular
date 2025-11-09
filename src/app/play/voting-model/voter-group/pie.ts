import { Component, input } from '@angular/core';
import { PieShares } from '../../../display/pies';

@Component({
    selector: 'g[appPie]',
    imports: [],
    templateUrl: './pie.html',
    styleUrl: './pie.scss',
})
export class Pie {
    readonly size = input.required<number>();
    readonly pieShares = input.required<PieShares>();
}
