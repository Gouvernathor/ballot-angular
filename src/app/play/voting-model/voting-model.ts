import { Component, input } from "@angular/core";
import { DragDropModule, Point } from "@angular/cdk/drag-drop";
import { Candidate, Opinions } from "../../core/candidate";
import { Ballot } from "../../core/ballot";
import { GaussianVoters, SingleVoter, VoterGroup } from "../../core/voter-group";
import { VotingMethod } from "../../core/voting-method";
import { CastBallotSignalType } from "../../core/voting";
import { SingleVoter as SingleVoterComponent } from "./voter-group/single-voter";
import { GaussianVoter as GaussianVoterComponent } from "./voter-group/gaussian-voter";
import { CandidateComponent } from "./voter-group/candidate";
import { Cues } from "./voter-group/cues/cues";

@Component({
    selector: "app-voting-model",
    imports: [Cues, CandidateComponent, SingleVoterComponent, GaussianVoterComponent, DragDropModule],
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

    isGaussianVoters(voterGroup: VoterGroup): voterGroup is GaussianVoters {
        return voterGroup instanceof GaussianVoters;
    }

    pointToOpinions(point: Readonly<Point>): Opinions {
        return [point.x, point.y];
    }
    opinionsToPoint(op: Opinions): Readonly<Point> {
        return {
            x: op[0],
            y: op[1],
        };
    }

    constrainPosition(
        userPointerPosition: Point,
        // dragRef: DragRef,
        // dimensions: DOMRect,
        // pickupPositionInElement: Point,
    ) {
        let {x, y} = userPointerPosition;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        // TODO also apply max constraints
        return {x, y};
    }
}
