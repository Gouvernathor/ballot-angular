import { Component } from '@angular/core';
import { Banner } from "../banner/banner";
import { Part0 } from "../parts/part0/part0";
import { Part1 } from "../parts/part1/part1";
import { Part2 } from "../parts/part2/part2";
import { Part3 } from "../parts/part3/part3";
import { Part4 } from "../parts/part4/part4";
import { Part5 } from "../parts/part5/part5";

@Component({
    selector: 'app-ballot',
    imports: [Banner, Part0, Part1, Part2, Part3, Part4, Part5],
    templateUrl: './ballot.html',
    styleUrl: './ballot.scss',
})
export class Ballot {
}
