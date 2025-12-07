import { Component } from '@angular/core';
import { Part0 } from '../../../../parts/part0/part0';
import { Model1 } from "../../../../parts/part0/model1";
import { Model2 } from "../../../../parts/part0/model2";

@Component({
    selector: 'app-fr-fr-part0',
    imports: [Model1, Model2],
    templateUrl: './part0.html',
    styleUrls: ['../../../../parts/part0/part0.scss'],
})
export class FrFrPart0 extends Part0 {
}
