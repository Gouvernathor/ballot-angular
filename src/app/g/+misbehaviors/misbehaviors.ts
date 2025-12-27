import { Component } from '@angular/core';
import { Banner } from "../../banner/banner";
import { BannerInfighting } from "./banner-infighting";

@Component({
    imports: [Banner, BannerInfighting],
    templateUrl: './misbehaviors.html',
    styleUrl: './misbehaviors.scss',
})
export class Misbehaviors {
}
