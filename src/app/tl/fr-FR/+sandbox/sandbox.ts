import { Component } from '@angular/core';
import { Sandbox } from '../../../+sandbox/sandbox';
import { ElectionModel } from "../../../play/election-model/election-model";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-fr-fr-sandbox',
    imports: [ElectionModel, RouterLink],
    templateUrl: './sandbox.html',
    styleUrls: ['../../../+sandbox/sandbox.scss'],
})
export class FrFrSandbox extends Sandbox {
}
