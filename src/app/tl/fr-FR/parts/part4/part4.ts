import { Component } from '@angular/core';
import { Part4 } from '../../../../parts/part4/part4';
import { ElectionModel } from "../../../../play/election-model/election-model";

@Component({
    selector: 'app-fr-fr-part4',
    imports: [ElectionModel],
    templateUrl: './part4.html',
    styleUrls: ['../../../../parts/part4/part4.scss'],
})
export class FrFrPart4 extends Part4 {
}
