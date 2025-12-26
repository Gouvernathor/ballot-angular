import { Component } from '@angular/core';
import { Part1 } from '../../../../+index/parts/part1/part1';
import { FrFrBannerPart1 } from "./banner";
import { ModelAndBallot } from "../../../../play/ballot/model-and-ballot";

@Component({
    selector: 'app-fr-fr-part1',
    imports: [FrFrBannerPart1, ModelAndBallot],
    templateUrl: './part1.html',
    styleUrls: ['../../../../+index/parts/part1/part1.scss'],
})
export class FrFrPart1 extends Part1 {
}
