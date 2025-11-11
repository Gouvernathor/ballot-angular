import { computed, Signal, WritableSignal } from "@angular/core";
import { Opinions } from "./candidate";

export interface VoterGroup {
    readonly getReferenceOpinions: WritableSignal<Opinions>;
    getAllVotersOpinions(): readonly Opinions[];
}

export class SingleVoter implements VoterGroup {
    constructor(
        public readonly getReferenceOpinions: WritableSignal<Opinions>,
    ) {}
    readonly getAllVotersOpinions: Signal<readonly [Opinions]> = computed(() =>
        [this.getReferenceOpinions()]);
}

export interface GaussianVoterOptions {
    /**
     * This is the number of voter groups. A larger number makes this group smaller.
     */
    num?: 1|2|3;
}
/**
 * Grab radius: 50
 */
export class GaussianVoters implements VoterGroup {
    public readonly offsets: readonly Opinions[];

    constructor(
        public readonly getReferenceOpinions: WritableSignal<Opinions>,
        {
            num = 3
        }: GaussianVoterOptions = {},
    ) {
        this.offsets = this.generateOffsets(num);
    }

    private generateOffsets(num: 1|2|3): readonly Opinions[] {
        /**
         * These are, for each voter ring:
         * - the minimum spacing between two voters of the ring
         * - the radius increment from the smaller ring
         * (or the radius of the first ring)
         *
         * The center point does not count as a ring.
         */
        const spacings = [10, 11, 12, 15, 20, 30, 50, 100];
        if (num === 1) {
            // THIS IS SPLICE NOT SLICE
            spacings.splice(3);
        } else if (num === 2) {
            spacings.splice(2);
        }
        // if 3 : 8 rings

        const points: Opinions[] = [[0, 0]]; // center point
        let radius = 0;
        for (const spacing of spacings) {
            radius += spacing;

            const circumference = 2 * Math.PI * radius;
            const nPoints = Math.floor(circumference / spacing);

            for (let pointIndex = 0; pointIndex < nPoints; pointIndex++) {
                const angle = (pointIndex / nPoints) * 2 * Math.PI;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                points.push([x, y]);
            }
        }

        return points;
    }

    readonly getAllVotersOpinions: Signal<readonly Opinions[]> = computed(() => {
        const reference = this.getReferenceOpinions();
        return this.offsets.map((offset) => [
            reference[0] + offset[0],
            reference[1] + offset[1],
        ]);
    });
}
