import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { ElectionMethodId, ElectionService } from '../../core/election';
import { Voting } from '../../core/voting';
import { makeApprovalVotingMethod, makePluralityVotingMethod, makeRankedVotingMethod, makeScoreVotingMethod } from '../../core/voting-method';
import { Candidates } from '../../display/candidates';

export enum ElectionModelFeatures {
    Basic = 1,
    Voters,
    VotersAndCandidates,
    VotersAndCandidatesAndSave,
}

// TODO awaiting evolution on the side of VotingService
function makeConstant<T>(value: T): () => T {
    return () => value;
}

@Component({
    selector: 'app-election-model',
    imports: [],
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

    // BALLOTS FOR EACH VOTING METHOD
    private readonly castPluralityBallots = this.votingService.getComputedCastBallots(
        this.candidates,
        makeConstant(makePluralityVotingMethod()),
        this.voterGroups,
    );
    private readonly castRankedBallots = this.votingService.getComputedCastBallots(
        this.candidates,
        makeConstant(makeRankedVotingMethod()),
        this.voterGroups,
    );
    private readonly castApprovalBallots = this.votingService.getComputedCastBallots(
        this.candidates,
        makeConstant(makeApprovalVotingMethod()),
        this.voterGroups,
    );
    private readonly castScoreBallots = this.votingService.getComputedCastBallots(
        this.candidates,
        makeConstant(makeScoreVotingMethod()),
        this.voterGroups,
    );

    // ELECTION RESULT INFORMATION FOR EACH ELECTION METHOD
    private readonly fptpResultInformation = computed(() =>
        this.electionService.generateFPTPResultInformation());
    private readonly irvResultInformation = computed(() =>
        this.electionService.generateIRVResultInformation());
    private readonly bordaResultInformation = computed(() =>
        this.electionService.generateBordaResultInformation());
    private readonly condorcetResultInformation = computed(() =>
        this.electionService.generateCondorcetResultInformation());
    private readonly approvalResultInformation = computed(() =>
        this.electionService.generateApprovalResultInformation());
    private readonly scoreResultInformation = computed(() =>
        this.electionService.generateScoreResultInformation());

    // ACTUAL WINNER
    private readonly winnerColor = computed(() => {
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
