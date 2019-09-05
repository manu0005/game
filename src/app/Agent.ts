import {C, ReversiModelInterface, TileCoords, Turn} from './ReversiDefinitions';
import {Injectable} from '@angular/core';
import {ReversiService} from './reversi.service';

export function factoryAgent(model: ReversiService): Agent {
  return new Agent(model);
}

@Injectable({
  providedIn: null,
})
export class Agent {
    player: C = C.Empty;
    constructor(private model: ReversiService) {
        model.getObservable().subscribe(() => this.play());
    }

    play(): void {
        if (this.model.turn() !== this.player) {
            return;
        }

        let max = 0;
        let maxPos: TileCoords;

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const p = this.model.canPlay(i, j);

                if (p.length > max) {
                    max = p.length;
                    maxPos = {x: i, y: j};
                }
            }
        }

        if (max > 0) {
            window.setTimeout(() => this.model.play(maxPos.x, maxPos.y), 1000/10);
        }
    }
}
