import { Component, computed, inject, signal } from '@angular/core';
import { makePluralityVotingMethod } from '../../core/voting-method';
import { SingleVoter } from '../../core/voter-group';
import { VotingModel } from "../../play/voting-model/voting-model";
import { Candidate } from '../../core/candidate';
import { Voting } from '../../core/voting';
import { Candidates } from '../../display/candidates';

@Component({
    selector: 'app-model1',
    imports: [VotingModel],
    templateUrl: './model1.html',
    styleUrl: './model1.scss',
})
export class Model1 {
    readonly votingService = inject(Voting);
    readonly candidatesDisplayService = inject(Candidates);

    readonly plurality = makePluralityVotingMethod();
    readonly candidates: Candidate[] = [
        { shape: 'square', getOpinions: signal([50, 125]) },
        { shape: 'triangle', getOpinions: signal([250, 125]) },
    ]
    readonly voterGroups = new Set([new SingleVoter(signal([125, 200]))]);
    readonly castBallots = this.votingService.getComputedCastBallots(
        () => this.candidates,
        () => this.plurality,
        () => this.voterGroups,
    );
    readonly winner = computed(() =>
        Array.from(this.castBallots().values())[0]()[0]);
}
