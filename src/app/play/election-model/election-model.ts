import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { Opinions } from '../../core/candidate';
import { ElectionMethodId, ElectionService } from '../../core/election';
import { VotingService } from '../../core/voting';
import { makeApprovalVotingMethod, makePluralityVotingMethod, makeRankedVotingMethod, makeScoreVotingMethod } from '../../core/voting-method';
import { CandidatesDisplayService } from '../../display/candidates';
import { VotingModel } from "../voting-model/voting-model";
import { FPTPResult } from '../election-result/fptp-result';
import { IrvResult } from "../election-result/irv-result";
import { BordaResult } from "../election-result/borda-result";
import { CondorcetResult } from "../election-result/condorcet-result";
import { ApprovalResult } from "../election-result/approval-result";
import { ScoreResult } from "../election-result/score-result";
import { ButtonGroup, ButtonOption } from "./button-group/button-group";
import { SaveService } from '../../save/save';

export enum ElectionModelFeatures {
    Basic = 1,
    Voters,
    VotersAndCandidates,
    FullSandbox,
}

@Component({
    selector: 'app-election-model',
    imports: [VotingModel, FPTPResult, IrvResult, BordaResult, CondorcetResult, ApprovalResult, ScoreResult, ButtonGroup],
    templateUrl: './election-model.html',
    styleUrl: './election-model.scss',
    host: {
        "[class.sandbox]": "features() >= ElectionModelFeatures.FullSandbox",
    }
})
export class ElectionModel {
    private readonly votingService = inject(VotingService);
    readonly electionService = inject(ElectionService);
    private readonly candidateDisplayService = inject(CandidatesDisplayService);
    private readonly saveService = inject(SaveService);

    readonly description = input("");
    readonly features = input(ElectionModelFeatures.Basic);
    readonly ElectionModelFeatures = ElectionModelFeatures; // Expose enum to template
    readonly defaultElectionMethod = input<ElectionMethodId>("FPTP");
    readonly defaultCandidates = input<(2|3|4|5)|readonly Opinions[]|undefined>();
    readonly defaultVoterGroups = input<(1|2|3)|readonly Opinions[]|undefined>();

    readonly electionMethodOptions: readonly ButtonOption<ElectionMethodId>[] = ([
        "FPTP",
        "IRV",
        "Borda",
        "Condorcet",
        "Approval",
        "Score",
    ] as const).map(s => ({ name: s, value: s }));
    readonly electionMethod = linkedSignal(() => this.defaultElectionMethod());
    readonly candidateNumberOptions: readonly ButtonOption<2|3|4|5>[] = [
        { name: 'two', value: 2 },
        { name: 'three', value: 3 },
        { name: 'four', value: 4 },
        { name: 'five', value: 5 },
    ];
    readonly candidates = linkedSignal(() => this.electionService.makeCandidates(this.defaultCandidates()));
    readonly candidateCount = computed(() => this.candidates().length as 2|3|4|5);
    readonly voterGroupNumberOptions: readonly ButtonOption<1|2|3>[] = [
        { name: 'one', value: 1 },
        { name: 'two', value: 2 },
        { name: 'three', value: 3 },
    ];
    readonly voterGroups = linkedSignal(() => this.electionService.makeVoterGroups(this.defaultVoterGroups()));
    readonly voterGroupCount = computed(() => this.voterGroups().size as 1|2|3);

    reset() {
        this.electionMethod.set(this.defaultElectionMethod());
        this.candidates.set(this.electionService.makeCandidates(this.defaultCandidates()));
        this.voterGroups.set(this.electionService.makeVoterGroups(this.defaultVoterGroups()));
    }
    readonly saveUrl = signal("");
    save() {
        this.saveUrl.set(this.saveService.getUrl({
            electionMethod: this.electionMethod(),
            candidates: this.candidates().map(c => c.getOpinions()),
            voters: Array.from(this.voterGroups().values(), vg => vg.getReferenceOpinions()),
            description: this.description(),
        }));
    }

    private readonly votingMethods = {
        plurality: makePluralityVotingMethod(),
        ranked: makeRankedVotingMethod(),
        approval: makeApprovalVotingMethod(),
        score: makeScoreVotingMethod(),
    };
    readonly votingMethod = computed(() => {
        switch (this.electionMethod()) {
            case "FPTP":
                return this.votingMethods.plurality;
            case "IRV":
            case "Borda":
            case "Condorcet":
                return this.votingMethods.ranked;
            case "Approval":
                return this.votingMethods.approval;
            case "Score":
                return this.votingMethods.score;
        }
    });

    // BALLOTS FOR EACH VOTING METHOD
    private readonly castPluralityBallots = this.votingService.getComputedCastBallots(
        this.candidates,
        () => this.votingMethods.plurality,
        this.voterGroups,
    );
    private readonly castRankedBallots = this.votingService.getComputedCastBallots(
        this.candidates,
        () => this.votingMethods.ranked,
        this.voterGroups,
    );
    private readonly castApprovalBallots = this.votingService.getComputedCastBallots(
        this.candidates,
        () => this.votingMethods.approval,
        this.voterGroups,
    );
    private readonly castScoreBallots = this.votingService.getComputedCastBallots(
        this.candidates,
        () => this.votingMethods.score,
        this.voterGroups,
    );
    readonly castBallots = computed(() => {
        switch (this.electionMethod()) {
            case "FPTP":
                return this.castPluralityBallots();
            case "IRV":
            case "Borda":
            case "Condorcet":
                return this.castRankedBallots();
            case "Approval":
                return this.castApprovalBallots();
            case "Score":
                return this.castScoreBallots();
        }
    });

    // ELECTION RESULT INFORMATION FOR EACH ELECTION METHOD
    readonly fptpResultInformation = computed(() =>
        this.electionService.generateFPTPResultInformation(this.castPluralityBallots));
    readonly irvResultInformation = computed(() =>
        this.electionService.generateIRVResultInformation(this.castRankedBallots));
    readonly bordaResultInformation = computed(() =>
        this.electionService.generateBordaResultInformation(this.castRankedBallots));
    readonly condorcetResultInformation = computed(() =>
        this.electionService.generateCondorcetResultInformation(this.castRankedBallots, this.candidates()));
    readonly approvalResultInformation = computed(() =>
        this.electionService.generateApprovalResultInformation(this.castApprovalBallots));
    readonly scoreResultInformation = computed(() =>
        this.electionService.generateScoreResultInformation(this.castScoreBallots, this.votingMethods.score.numScores));

    // ACTUAL WINNER
    readonly winnerColor = computed(() => {
        switch (this.electionMethod()) {
            case "FPTP":
                return this.candidateDisplayService.getColor(this.fptpResultInformation().winner);
            case "IRV":
                return this.candidateDisplayService.getColor(this.irvResultInformation().winner);
            case "Borda":
                return this.candidateDisplayService.getColor(this.bordaResultInformation().winner);
            case "Condorcet":
                const condoWinner = this.condorcetResultInformation().winner;
                if (condoWinner === null) {
                    return this.candidateDisplayService.getCondorcetFailureColor();
                }
                return this.candidateDisplayService.getColor(condoWinner);
            case "Approval":
                return this.candidateDisplayService.getColor(this.approvalResultInformation().winner);
            case "Score":
                return this.candidateDisplayService.getColor(this.scoreResultInformation().winner);
        }
    });
}
