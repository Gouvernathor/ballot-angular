import { Component, computed, inject, signal } from "@angular/core";
import { plurality } from "ecclesia/election/attribution";
import { VotingModel } from "../../play/voting-model/voting-model";
import { Voting } from "../../core/voting";
import { TallyService } from "../../core/tally";
import { makePluralityVotingMethod } from "../../core/voting-method";
import { Candidate } from "../../core/candidate";
import { GaussianVoters } from "../../core/voter-group";
import { PluralityResult } from "../../play/election-result/plurality-result";
import { Candidates } from "../../display/candidates";
import { AttributionService } from "../../core/attribution";

@Component({
    selector: "app-model2",
    imports: [VotingModel, PluralityResult],
    templateUrl: "./model2.html",
    styleUrls: ["../inserts.scss", "./model2.scss"],
})
export class Model2 {
    private readonly votingService = inject(Voting);
    private readonly tallyService = inject(TallyService);
    readonly candidatesDisplayService = inject(Candidates);
    private readonly attributionService = inject(AttributionService);

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
    readonly tally = computed(() =>
        this.tallyService.tallyPluralityToSimple(this.votingService.extractBallots(this.castBallots)));
    private readonly attribution = plurality<Candidate>({ nSeats: 1 });
    readonly winner = computed(() =>
        this.attributionService.extractSingleWinnerFromAttribution(this.attribution(this.tally())));
}
