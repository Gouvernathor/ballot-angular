import { Component } from '@angular/core';
import { Splash } from "../splash/splash";
import { Part0 } from "../part0/part0";
import { Part1 } from "../part1/part1";
import { Part2 } from "../part2/part2";
import { Part3 } from "../part3/part3";
import { Part4 } from "../part4/part4";
import { Part5 } from "../part5/part5";

@Component({
    selector: 'app-ballot',
    imports: [Splash, Part0, Part1, Part2, Part3, Part4, Part5],
    templateUrl: './ballot.html',
    styleUrl: './ballot.scss',
})
export class Ballot {
}
