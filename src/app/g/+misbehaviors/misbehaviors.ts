import { Component } from '@angular/core';
import { Banner } from "../../banner/banner";
import { Nav } from '../../nav/nav';

@Component({
    imports: [Banner, Nav],
    templateUrl: './misbehaviors.html',
    styleUrl: './misbehaviors.scss',
})
export class Misbehaviors {
}
