import { Component, computed, inject, signal } from "@angular/core";
import { VotingModel } from "../../play/voting-model/voting-model";
import { PluralityResult } from "../../play/election-result/plurality-result";
import { makePluralityVotingMethod } from "../../core/voting-method";
import { Candidate } from "../../core/candidate";
import { GaussianVoters } from "../../core/voter-group";
import { Voting } from "../../core/voting";
import { Candidates } from "../../display/candidates";
import { plurality } from "ecclesia/election/attribution";
import { TallyService } from "../../core/tally";
import { AttributionService } from "../../core/attribution";

@Component({
    selector: "app-model3",
    imports: [VotingModel, PluralityResult],
    templateUrl: "./model3.html",
    styleUrls: ["../inserts.scss", "./model3.scss"],
})
export class Model3 {
    private readonly votingService = inject(Voting);
    readonly candidatesDisplayService = inject(Candidates);
    private readonly tallyService = inject(TallyService);
    private readonly attributionService = inject(AttributionService);

    readonly plurality = makePluralityVotingMethod();
    readonly candidates: readonly Candidate[] = [
        { shape: "square", getOpinions: signal([50, 125]) },
        { shape: "triangle", getOpinions: signal([250, 125]) },
        { shape: "hexagon", getOpinions: signal([280, 280]) },
    ];
    readonly voterGroups = new Set([
        new GaussianVoters(signal([152, 125])),
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

    reset() {
        this.candidates[0].getOpinions.set([50, 125]);
        this.candidates[1].getOpinions.set([250, 125]);
        this.candidates[2].getOpinions.set([280, 280]);
        this.voterGroups.values().next().value!.getReferenceOpinions.set([152, 125]);
    }
}
