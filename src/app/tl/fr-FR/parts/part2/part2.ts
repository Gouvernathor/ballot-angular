import { Component } from '@angular/core';
import { Part2 } from '../../../../parts/part2/part2';
import { FrFrBannerPart2 } from './banner';
import { ElectionModel } from "../../../../play/election-model/election-model";

@Component({
  selector: 'app-fr-fr-part2',
  imports: [FrFrBannerPart2, ElectionModel],
  templateUrl: './part2.html',
  styleUrls: ['../../../../parts/part2/part2.scss'],
})
export class FrFrPart2 extends Part2 {
}
