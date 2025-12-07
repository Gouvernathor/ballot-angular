import { Component } from '@angular/core';
import { Index } from '../../../+index';
import { Banner } from "../../../banner/banner";
import { FrFrPart0 } from "../parts/part0/part0";

@Component({
    selector: 'app-fr-fr-index',
    imports: [Banner, FrFrPart0],
    templateUrl: './index.html',
    styleUrls: [],
})
export class FrFrIndex extends Index {
}
