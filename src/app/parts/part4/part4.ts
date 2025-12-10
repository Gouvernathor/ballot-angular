import { Component } from '@angular/core';
import { ElectionModel } from "../../play/election-model/election-model";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-part4',
    imports: [ElectionModel, RouterLink],
    templateUrl: './part4.html',
    styleUrl: './part4.scss',
})
export class Part4 {
}
