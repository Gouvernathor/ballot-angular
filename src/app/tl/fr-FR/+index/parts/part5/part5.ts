import { Component } from '@angular/core';
import { Part5 } from '../../../../../+index/parts/part5/part5';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-fr-fr-part5',
    imports: [RouterLink],
    templateUrl: './part5.html',
    styleUrls: ['../../../../../+index/parts/part5/part5.scss', './part5.scss'],
})
export class FrFrPart5 extends Part5 {
}
