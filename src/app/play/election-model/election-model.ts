import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { ElectionMethodId, ElectionService } from '../../core/election';
import { Voting } from '../../core/voting';
import { makeApprovalVotingMethod, makePluralityVotingMethod, makeRankedVotingMethod, makeScoreVotingMethod } from '../../core/voting-method';
import { Candidates } from '../../display/candidates';
import { VotingModel } from "../voting-model/voting-model";

export enum ElectionModelFeatures {
    Basic = 1,
    Voters,
    VotersAndCandidates,
    VotersAndCandidatesAndSave,
}

@Component({
    selector: 'app-election-model',
    imports: [VotingModel],
    templateUrl: './election-model.html',
    styleUrl: './election-model.scss',
})
export class ElectionModel {
    private readonly votingService = inject(Voting);
    private readonly electionService = inject(ElectionService);
    private readonly candidateDisplayService = inject(Candidates);

    readonly features = input(ElectionModelFeatures.Basic);
    readonly defaultElectionMethod = input<ElectionMethodId>("FPTP");
    readonly candidates = input(this.electionService.makeDefaultCandidates());
    readonly voterGroups = input(this.electionService.makeDefaultVoterGroups());

    private readonly electionMethod = linkedSignal(() => this.defaultElectionMethod());

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
    private readonly fptpResultInformation = computed(() =>
        this.electionService.generateFPTPResultInformation(this.castPluralityBallots));
    private readonly irvResultInformation = computed(() =>
        this.electionService.generateIRVResultInformation(this.castRankedBallots));
    private readonly bordaResultInformation = computed(() =>
        this.electionService.generateBordaResultInformation(this.castRankedBallots));
    private readonly condorcetResultInformation = computed(() =>
        this.electionService.generateCondorcetResultInformation(this.castRankedBallots, this.candidates()));
    private readonly approvalResultInformation = computed(() =>
        this.electionService.generateApprovalResultInformation(this.castApprovalBallots));
    private readonly scoreResultInformation = computed(() =>
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
                    return "#000"; // TODO put that default value in the candidate display service
                }
                return this.candidateDisplayService.getColor(condoWinner);
            case "Approval":
                return this.candidateDisplayService.getColor(this.approvalResultInformation().winner);
            case "Score":
                return this.candidateDisplayService.getColor(this.scoreResultInformation().winner);
        }
    });
}
