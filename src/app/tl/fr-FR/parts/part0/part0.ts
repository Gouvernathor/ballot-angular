import { Component } from '@angular/core';
import { Part0 } from '../../../../+index/parts/part0/part0';
import { Model1 } from "../../../../+index/parts/part0/model1";
import { Model2 } from "../../../../+index/parts/part0/model2";
import { Model3 } from "../../../../+index/parts/part0/model3";

@Component({
    selector: 'app-fr-fr-part0',
    imports: [Model1, Model2, Model3],
    templateUrl: './part0.html',
    styleUrls: ['../../../../+index/parts/part0/part0.scss'],
})
export class FrFrPart0 extends Part0 {
}
