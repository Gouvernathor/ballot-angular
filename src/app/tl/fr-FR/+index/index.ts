import { Component } from '@angular/core';
import { Index } from '../../../+index';
import { Banner } from "../../../banner/banner";
import { Nav } from '../../../nav/nav';
import { FrFrPart0 } from "../parts/part0/part0";
import { FrFrPart1 } from "../parts/part1/part1";

@Component({
    selector: 'app-fr-fr-index',
    imports: [Banner, Nav, FrFrPart0, FrFrPart1],
    templateUrl: './index.html',
    styleUrls: [],
})
export class FrFrIndex extends Index {
}
