import { computed, Injectable, Signal } from '@angular/core';
import { Candidate } from './candidate';
import { Ballot } from './ballot';
import { VotingMethod } from './voting-method';
import { VoterGroup } from './voter-group';

@Injectable({
    providedIn: 'root',
})
export class Voting {
    getComputedCastBallots<B extends Ballot>(
        getCandidates: Signal<readonly Candidate[]>,
        getVotingMethod: Signal<VotingMethod<B>>,
        getVoterGroups: Signal<ReadonlySet<VoterGroup>>,
    ): Signal<ReadonlyMap<VoterGroup, Signal<readonly Ballot[]>>> {
        return computed(() => {
            const candidates = getCandidates();
            const votingMethod = getVotingMethod();
            return new Map(Array.from(getVoterGroups().values(), voterGroup =>
                [voterGroup, computed(() => voterGroup
                    .getAllVotersOpinions()
                    .map(opinions => votingMethod(opinions, candidates)))]));
        });
    }
}
