import { Component } from '@angular/core';
import { Banner } from "../../banner/banner";
import { BannerInfighting } from "./banner-infighting";
import { BannerBlackmail } from "./banner-blackmail";

@Component({
    imports: [Banner, BannerInfighting, BannerBlackmail],
    templateUrl: './misbehaviors.html',
    styleUrl: './misbehaviors.scss',
})
export class Misbehaviors {
}
