import { Component, computed, inject, signal } from '@angular/core';
import { makePluralityVotingMethod } from '../../core/voting-method';
import { SingleVoter } from '../../core/voter-group';
import { VotingModel } from "../../play/voting-model/voting-model";
import { Candidate } from '../../core/candidate';
import { VotingService } from '../../core/voting';
import { CandidatesDisplayService } from '../../display/candidates';

@Component({
    selector: 'app-model1',
    imports: [VotingModel],
    templateUrl: './model1.html',
    styleUrls: ["../inserts.scss", './model1.scss'],
})
export class Model1 {
    readonly votingService = inject(VotingService);
    readonly candidatesDisplayService = inject(CandidatesDisplayService);

    readonly plurality = makePluralityVotingMethod();
    readonly candidates: readonly Candidate[] = [
        { shape: 'square', getOpinions: signal([50, 125]) },
        { shape: 'triangle', getOpinions: signal([250, 125]) },
    ]
    readonly voterGroups = new Set([new SingleVoter(signal([125, 200]))]);
    readonly castBallots = this.votingService.getComputedCastBallots(
        () => this.candidates,
        () => this.plurality,
        () => this.voterGroups,
    );
    private readonly winner = computed(() =>
        this.castBallots().values()[Symbol.iterator]().next().value!()[0]);
    readonly winnerColor = computed(() =>
        this.candidatesDisplayService.getColor(this.winner()));
    readonly winnerName = computed(() =>
        this.candidatesDisplayService.getLocalizedName(this.winner()));
}
