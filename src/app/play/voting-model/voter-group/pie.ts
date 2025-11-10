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
        const radius = this.size()/2;
        let currentShare = 0;
        let lastAngle = -Math.PI / 2;
        return this.pieShares().map(ps => {
            const startAngle = lastAngle;
            currentShare += ps.share;
            const endAngle = lastAngle = Math.PI * (-2 * (currentShare / total) - 0.5);
            const x1 = radius * Math.cos(startAngle);
            const y1 = radius * Math.sin(startAngle);
            const x2 = radius * Math.cos(endAngle);
            const y2 = radius * Math.sin(endAngle);
            const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
            return {
                d: `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${x2} ${y2} Z`,
                color: ps.color
            };
        });
    });
}
