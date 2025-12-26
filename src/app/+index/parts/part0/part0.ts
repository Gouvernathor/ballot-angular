import { Component } from '@angular/core';
import { Model1 } from "./model1";
import { Model2 } from './model2';
import { Model3 } from "./model3";

@Component({
    selector: 'app-part0',
    imports: [Model1, Model2, Model3],
    templateUrl: './part0.html',
    styleUrl: './part0.scss',
})
export class Part0 {
}
