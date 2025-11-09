import { Component, computed, input } from '@angular/core';
import { PieShares } from '../../../display/pies';

@Component({
    selector: 'g[appPie]',
    imports: [],
    templateUrl: './pie.html',
    styleUrl: './pie.scss',
})
export class Pie {
    readonly size = input.required<number>();
    readonly pieShares = input.required<PieShares>();

    readonly total = computed(() =>
        this.pieShares().total ?? this.pieShares().reduce((sum, ps) => sum + ps.share, 0));
    readonly pathDs = computed(() => {
        const total = this.total();
        const size = this.size();
        let currentShare = 0;
        let lastAngle = -Math.PI / 2;
        return this.pieShares().map(ps => {
            const startAngle = lastAngle;
            currentShare += ps.share;
            const endAngle = lastAngle = (currentShare / total) * 2 * Math.PI - Math.PI / 2;
            const x1 = (size/2) * Math.cos(startAngle);
            const y1 = (size/2) * Math.sin(startAngle);
            const x2 = (size/2) * Math.cos(endAngle);
            const y2 = (size/2) * Math.sin(endAngle);
            const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
            return {
                d: `M 0 0 L ${x1} ${y1} A ${size/2} ${size/2} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
                color: ps.color
            };
        });
    });
}
