import { Component, computed, inject, input, Signal, signal } from '@angular/core';
import { VotingService } from '../../core/voting';
import { makeApprovalVotingMethod, makePluralityVotingMethod, makeRankedVotingMethod, makeScoreVotingMethod, VotingMethod } from '../../core/voting-method';
import { Candidate } from '../../core/candidate';
import { SingleVoter } from '../../core/voter-group';
import { ApprovalBallot, Ballot, PluralityBallot, RankedBallot, ScoreBallot } from '../../core/ballot';
import { VotingModel } from "../voting-model/voting-model";
import { PluralityBallotComponent } from "./plurality-ballot";
import { RankedBallotComponent } from "./ranked-ballot";
import { ApprovalBallotComponent } from "./approval-ballot";
import { ScoreBallotComponent } from "./score-ballot";

@Component({
    selector: 'app-model-and-ballot',
    imports: [VotingModel, PluralityBallotComponent, RankedBallotComponent, ApprovalBallotComponent, ScoreBallotComponent],
    templateUrl: './model-and-ballot.html',
    styleUrl: './model-and-ballot.scss',
})
export class ModelAndBallot {
    readonly votingService = inject(VotingService);

    readonly kind = input.required<VotingMethod<any>["kind"]>();

    readonly votingMethod = computed(() => {
        switch (this.kind()) {
            case "plurality":
                return makePluralityVotingMethod();
            case "ranked":
                return makeRankedVotingMethod();
            case "approval":
                return makeApprovalVotingMethod();
            case "score":
                return makeScoreVotingMethod();
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
    readonly castBallots = this.votingService.getComputedCastBallots<Ballot>(
        () => this.candidates,
        this.votingMethod,
        () => this.voterGroups,
    );

    private readonly ballot = computed(() =>
        this.castBallots().get(this.voterGroup)!()[0]);
    readonly pluralityBallot = this.ballot as Signal<PluralityBallot>;
    readonly rankedBallot = this.ballot as Signal<RankedBallot>;
    readonly approvalBallot = this.ballot as Signal<ApprovalBallot>;
    readonly scoreBallot = this.ballot as Signal<ScoreBallot>;
}
