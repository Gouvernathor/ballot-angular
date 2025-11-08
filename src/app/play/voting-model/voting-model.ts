import { Component, input } from "@angular/core";
import { Candidate } from "../../core/candidate";
import { Ballot } from "../../core/ballot";
import { SingleVoter, VoterGroup } from "../../core/voter-group";
import { VotingMethod } from "../../core/voting-method";
import { CastBallotSignalType } from "../../core/voting";

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
    readonly castBallots = input.required<ReturnType<CastBallotSignalType<Ballot>>>();
    // TODO also takes a border color as an input, and if providedn sets the border width to 10px

    isSingleVoter(voterGroup: VoterGroup): voterGroup is SingleVoter {
        return voterGroup instanceof SingleVoter;
    }
}
