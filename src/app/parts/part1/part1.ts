import { Component } from '@angular/core';
import { BannerPart1 } from "./banner";
import { ModelAndBallot } from '../../play/ballot/model-and-ballot';

@Component({
    selector: 'app-part1',
    imports: [BannerPart1, ModelAndBallot],
    templateUrl: './part1.html',
    styleUrl: './part1.scss',
})
export class Part1 {
}
