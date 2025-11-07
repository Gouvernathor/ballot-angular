import { Component, computed, input, Signal } from "@angular/core";
import { Candidate } from "../../core/candidate";
import { Ballot } from "../../core/ballot";
import { SingleVoter, VoterGroup } from "../../core/voter-group";
import { VotingMethod } from "../../core/voting-method";

@Component({
    selector: "app-voting-model",
    imports: [],
    templateUrl: "./voting-model.html",
    styleUrl: "./voting-model.scss",
})
export class VotingModel {
    readonly votingMethod = input.required<VotingMethod<Ballot>>();
    readonly candidates = input.required<readonly Candidate[]>();
    readonly voterGroups = input.required<ReadonlySet<VoterGroup>>();

    readonly castBallots: Signal<ReadonlyMap<VoterGroup, Signal<readonly Ballot[]>>> = computed(() => {
        const candidates = this.candidates();
        const votingMethod = this.votingMethod();
        return new Map(Array.from(this.voterGroups().values(), voterGroup =>
            [voterGroup, computed(() => voterGroup
                .getAllVotersOpinions()
                .map(opinions => votingMethod(opinions, candidates)))]));
    });

    isSingleVoter(voterGroup: VoterGroup): voterGroup is SingleVoter {
        return voterGroup instanceof SingleVoter;
    }
}
