import { Component, computed, inject, signal } from "@angular/core";
import { VotingModel } from "../../play/voting-model/voting-model";
import { VotingService } from "../../core/voting";
import { makePluralityVotingMethod } from "../../core/voting-method";
import { Candidate } from "../../core/candidate";
import { GaussianVoters } from "../../core/voter-group";
import { FPTPResult } from "../../play/election-result/fptp-result";
import { CandidatesDisplayService } from "../../display/candidates";
import { ElectionService } from "../../core/election";

@Component({
    selector: "app-model2",
    imports: [VotingModel, FPTPResult],
    templateUrl: "./model2.html",
    styleUrls: ["../inserts.scss", "./model2.scss"],
})
export class Model2 {
    private readonly votingService = inject(VotingService);
    readonly candidatesDisplayService = inject(CandidatesDisplayService);
    private readonly electionService = inject(ElectionService);

    readonly plurality = makePluralityVotingMethod();
    readonly candidates: readonly Candidate[] = [
        { shape: "square", getOpinions: signal([50, 125]) },
        { shape: "triangle", getOpinions: signal([250, 125]) },
    ];
    readonly voterGroups = new Set([
        new GaussianVoters(signal([150, 150])),
    ]);
    readonly castBallots = this.votingService.getComputedCastBallots(
        () => this.candidates,
        () => this.plurality,
        () => this.voterGroups,
    );
    readonly results = computed(() =>
        this.electionService.generateFPTPResultInformation(this.castBallots));
}
