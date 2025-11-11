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
    host: {
        "[style.width.px]": "size()",
        "[style.height.px]": "size()",

        "[style.border-color]": "border()",
        "[style.border-width]": "border() && '10px'",
        // TODO fix that the border offcenters the model
    },
})
export class VotingModel {
    readonly votingMethod = input.required<VotingMethod<Ballot>>();
    readonly candidates = input.required<readonly Candidate[]>();
    readonly voterGroups = input.required<ReadonlySet<VoterGroup>>();
    readonly castBallots = input.required<ReturnType<CastBallotSignalType<Ballot>>>();

    readonly size = input(300);
    readonly border = input<string>();

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
    ) {
        let {x, y} = userPointerPosition;
        const size = this.size();
        if (x < 0) x = 0;
        else if (x > size) x = size;
        if (y < 0) y = 0;
        else if (y > size) y = size;
        return {x, y};
    }
}
