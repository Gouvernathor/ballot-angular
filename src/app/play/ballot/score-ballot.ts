import { Component, input } from '@angular/core';
import { ScoreBallot } from '../../core/ballot';

@Component({
    selector: 'app-score-ballot',
    imports: [],
    templateUrl: './score-ballot.html',
    styleUrls: ["./common-ballots.scss", './score-ballot.scss'],
})
export class ScoreBallotComponent {
    readonly ballot = input.required<ScoreBallot>();

    src(shape: string) {
        const ballot = this.ballot();
        const score = Array.from(ballot, ([c, score]) => ({ s: c.shape, score }))
            .find(({ s }) => s === shape)!.score;
        return `play/ballot/range${score}.webp`;
    }
}
