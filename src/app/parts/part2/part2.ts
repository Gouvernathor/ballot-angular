import { Component, signal } from '@angular/core';
import { BannerPart2 } from './banner';
import { ElectionModel } from "../../play/election-model/election-model";
import { Candidate } from '../../core/candidate';
import { GaussianVoters } from '../../core/voter-group';

@Component({
    selector: 'app-part2',
    imports: [BannerPart2, ElectionModel],
    templateUrl: './part2.html',
    styleUrl: './part2.scss',
})
export class Part2 {
    readonly election1DefaultCandidates: readonly Candidate[] = [
        { shape: "square", getOpinions: signal([50, 125]) },
        { shape: "triangle", getOpinions: signal([250, 125]) },
        { shape: "hexagon", getOpinions: signal([280, 280]) },
    ];
    readonly election1DefaultVoterGroups = new Set([
        new GaussianVoters(signal([155, 125])),
    ]);
}
