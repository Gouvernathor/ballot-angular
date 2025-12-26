import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Sandbox } from '../../../+sandbox/sandbox';
import { ElectionModel } from "../../../play/election-model/election-model";

@Component({
    imports: [ElectionModel, RouterLink],
    templateUrl: './sandbox.html',
    styleUrls: ['../../../+sandbox/sandbox.scss'],
})
export class FrFrSandbox extends Sandbox {
}
