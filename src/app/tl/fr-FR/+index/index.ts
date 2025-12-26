import { Component } from '@angular/core';
import { Index } from '../../../+index';
import { Banner } from "../../../banner/banner";
import { Nav } from '../../../nav/nav';
import { FrFrPart0 } from "./parts/part0/part0";
import { FrFrPart1 } from "./parts/part1/part1";
import { FrFrPart2 } from './parts/part2/part2';
import { FrFrPart3 } from './parts/part3/part3';
import { FrFrPart4 } from "./parts/part4/part4";
import { FrFrPart5 } from "./parts/part5/part5";

@Component({
    imports: [Banner, Nav, FrFrPart0, FrFrPart1, FrFrPart2, FrFrPart3, FrFrPart4, FrFrPart5],
    templateUrl: './index.html',
    styleUrls: [],
})
export class FrFrIndex extends Index {
}
