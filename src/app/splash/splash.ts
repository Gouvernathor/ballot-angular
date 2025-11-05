import { Component, ElementRef, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import RNG, {} from "@gouvernathor/rng";

type State = 0 | 1 | 2;
type Grid = State[][];
type ReadonlyGrid = readonly (readonly State[])[];

@Component({
    selector: 'app-splash',
    imports: [],
    templateUrl: './splash.html',
    styleUrl: './splash.scss',
    host: {
        "[style.width.px]": "width",
        "[style.height.px]": "height",
    },
})
export class Splash implements OnInit, OnDestroy {
    readonly width = 1500;
    readonly height = 400;
    readonly SIZE = 25;
    readonly w = this.width / this.SIZE;
    readonly h = this.height / this.SIZE;

    readonly element = viewChild.required<ElementRef<HTMLCanvasElement>>("element");

    readonly grid = signal<ReadonlyGrid>(this.makeGrid());
    private makeGrid() {
        const rng = new RNG();
        const grid: State[][] = [];
        for (let y = 0; y < this.h; y++) {
            const row: State[] = [];
            grid.push(row);
            for (let x = 0; x < this.w; x++) {
                row.push(rng.randRange(0, 3) as State);
            }
        }
        return grid;
    }

    private mousePos: [number, number] | undefined = undefined;
    onMouseMove(event: MouseEvent) {
        const rect = this.element().nativeElement.getBoundingClientRect();
        this.mousePos = [
            Math.floor((event.pageX - rect.left) / this.SIZE),
            Math.floor((event.pageY - rect.top) / this.SIZE),
        ];
    }
    onMouseLeave() {
        this.mousePos = undefined;
    }

    /**
     * All the neighbors within the grid's bounds, and of the target state.
     */
    private getNeighbors(grid: ReadonlyGrid, initX: number, initY: number, targetState: State|undefined) {
        const neighbors: [number, number][] = [];
        for (let y = initY - 1; y <= initY + 1; y++) {
            if (y >= 0 && y <= this.h - 1) {
                for (let x = initX - 1; x <= initX + 1; x++) {
                    if (x >= 0 && x <= this.w - 1) {
                        const state = grid[y][x];
                        if (targetState === undefined || state === targetState) {
                            neighbors.push([x, y]);
                        }
                    }
                }
            }
        }
        return neighbors;
    }

    private update() {
        if (!this.inView) return;
        // TODO check that the test does work

        const grid: Grid = this.grid().map(row => row.slice() as State[]);
        const rng = new RNG();

        const positions: [number, number][] = [];
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                positions.push([x, y]);
            }
        }

        for (const [x, y] of rng.shuffled(positions)) {
            // the cell
            const state = grid[y][x];

            // the target state
            const targetState = (state + 1) % 3 as State;

            // get a random fitting neighbor
            const neighbors = this.getNeighbors(grid, x, y, targetState);
            if (neighbors.length > 0) {
                const [targetX, targetY] = rng.choice(neighbors);
                grid[targetY][targetX] = state;
            }
        }

        // randomly scramble near the mouse
        if (this.mousePos) {
            const [mouseX, mouseY] = this.mousePos;
            this
                .getNeighbors(
                    grid,
                    mouseX,
                    mouseY,
                    undefined)
                .forEach(([x, y]) =>
                    grid[y][x] = rng.randRange(0, 3) as State);
        }

        this.grid.set(grid);
    }

    private intervalId?: ReturnType<typeof setInterval>;
    private observer?: IntersectionObserver;
    private inView = true;
    ngOnInit(): void {
        this.intervalId = setInterval(() => this.update(), 50);

        if (typeof IntersectionObserver !== "undefined") {
            this.observer = new IntersectionObserver(entries => {
                // Take the latest entry
                this.inView = entries.sort((a, b) => b.time - a.time)[0].isIntersecting;
            });
            this.observer.observe(this.element().nativeElement);
        }
    }
    ngOnDestroy(): void {
        clearInterval(this.intervalId);

        this.observer?.disconnect();
    }
}
