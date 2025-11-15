import { computed, Injectable, Signal } from '@angular/core';
import { Candidate } from './candidate';
import { Ballot } from './ballot';
import { VotingMethod } from './voting-method';
import { VoterGroup } from './voter-group';

export type CastBallotSignalType<B extends Ballot> = Signal<ReadonlyMap<VoterGroup, Signal<readonly B[]>>>;

@Injectable({
    providedIn: 'root',
})
export class VotingService {
    getComputedCastBallots<B extends Ballot>(
        getCandidates: () => readonly Candidate[],
        getVotingMethod: () => VotingMethod<B>,
        getVoterGroups: () => ReadonlySet<VoterGroup>,
    ): CastBallotSignalType<B> {
        return computed(() => {
            const candidates = getCandidates();
            const votingMethod = getVotingMethod();
            return new Map(Array.from(getVoterGroups().values(), voterGroup =>
                [voterGroup, computed(() => voterGroup
                    .getAllVotersOpinions()
                    .map(opinions => votingMethod(opinions, candidates)))]));
        });
    }

    *extractBallots<B extends Ballot>(
        ballots: CastBallotSignalType<B>,
    ): Iterable<B> {
        for (const ballotSignal of ballots().values()) {
            for (const ballot of ballotSignal()) {
                yield ballot;
            }
        }
    }
}
