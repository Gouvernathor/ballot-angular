import { Component } from '@angular/core';
import { Banner } from "../../banner/banner";
import { BannerBlackmail } from "./banner-blackmail";

@Component({
    imports: [Banner, BannerBlackmail],
    templateUrl: './misbehaviors.html',
    styleUrl: './misbehaviors.scss',
})
export class Misbehaviors {
}
