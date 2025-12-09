import { Component } from '@angular/core';
import { Part3 } from '../../../../parts/part3/part3';
import { FrFrBannerPart3 } from "./banner";

@Component({
    selector: 'app-fr-fr-part3',
    imports: [FrFrBannerPart3],
    templateUrl: './part3.html',
    styleUrls: ['../../../../parts/part3/part3.scss'],
})
export class FrFrPart3 extends Part3 {
}
