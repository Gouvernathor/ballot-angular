import { Component } from '@angular/core';
import { BannerPart2 } from './banner';
import { ElectionModel } from "../../../play/election-model/election-model";

@Component({
    selector: 'app-part2',
    imports: [BannerPart2, ElectionModel],
    templateUrl: './part2.html',
    styleUrl: './part2.scss',
})
export class Part2 {
}
