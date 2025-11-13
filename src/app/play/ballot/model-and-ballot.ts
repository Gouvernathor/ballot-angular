import { Component, computed, inject, input, Signal, signal } from '@angular/core';
import { Voting } from '../../core/voting';
import { makePluralityVotingMethod, VotingMethod } from '../../core/voting-method';
import { Candidate } from '../../core/candidate';
import { SingleVoter } from '../../core/voter-group';
import { VotingModel } from "../voting-model/voting-model";
import { PluralityBallotComponent } from "./plurality-ballot";
import { PluralityBallot } from '../../core/ballot';

@Component({
    selector: 'app-model-and-ballot',
    imports: [VotingModel, PluralityBallotComponent],
    templateUrl: './model-and-ballot.html',
    styleUrl: './model-and-ballot.scss',
})
export class ModelAndBallot {
    readonly votingService = inject(Voting);

    readonly kind = input.required<VotingMethod<any>["kind"]>();

    readonly votingMethod = computed(() => {
        switch (this.kind()) {
            case "plurality":
                return makePluralityVotingMethod();
            default:
                throw new Error(`Unsupported voting method kind: ${this.kind()}`);
        }
    });
    readonly candidates: Candidate[] = [
        { shape: "square", getOpinions: signal([41, 50]) },
        { shape: "triangle", getOpinions: signal([153, 95]) },
        { shape: "hexagon", getOpinions: signal([216, 216]) },
    ];
    private readonly voterGroup = new SingleVoter(signal([81, 92]));
    readonly voterGroups = new Set([ this.voterGroup ]);
    readonly castBallots = this.votingService.getComputedCastBallots(
        () => this.candidates,
        this.votingMethod,
        () => this.voterGroups,
    );

    private readonly ballot = computed(() =>
        this.castBallots().get(this.voterGroup)!()[0]);
    readonly pluralityBallot: Signal<PluralityBallot> = this.ballot;
}
