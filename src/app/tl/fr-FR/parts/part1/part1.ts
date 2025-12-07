import { Component } from '@angular/core';
import { Part1 } from '../../../../parts/part1/part1';
import { FrFrBannerPart1 } from "./banner";

@Component({
    selector: 'app-fr-fr-part1',
    imports: [FrFrBannerPart1],
    templateUrl: './part1.html',
    styleUrls: ['../../../../parts/part1/part1.scss'],
})
export class FrFrPart1 extends Part1 {
}
