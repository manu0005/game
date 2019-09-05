import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board, C, Turn} from '../ReversiDefinitions';
import {ReversiService} from '../reversi.service';
import {Agent, factoryAgent} from '../Agent';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [{
    provide: Agent,
    useFactory: factoryAgent,
    multi: true,
    deps: [ReversiService]
  }],
  changeDetection: ChangeDetectionStrategy.OnPush // Optimisation des MAJ
})
export class BoardComponent implements OnInit {
  @Input() set player(p: Turn) {
    this.agent[0].player = p;
    this.agent[0].play();
  }
  vainqueur: string = null;

  constructor(private rs: ReversiService, private agent: Agent) { }

  ngOnInit() {
    this.rs.obsFinish.subscribe(c => {
      if (this.nbBlanc + this.nbNoir > 0) {
        this.finish(c);
      }
    });
  }

  getObservable() {
    return this.rs.getObservable();
  }

  get board(): Board {
    return this.rs.getBoard();
  }

  clickOn(x: number, y: number) {
    this.rs.play(x, y);
  }

  canPlay(x: number, y: number): boolean {
    return this.rs.canPlay(x, y).length > 0;
  }

  isEmpty(c: C) {
    return c === C.Empty;
  }

  get nbBlanc(): number {
    return this.rs.nbBlanc();
  }

  get nbNoir(): number {
    return this.rs.nbNoir();
  }

  finish(c: Turn) {
    const winner = this.nbBlanc > this.nbNoir ? '1' : (this.nbBlanc === this.nbNoir ? '1 et 2' : '2');
    this.vainqueur = `Vainqueur : ${winner}`;
  }

  trackByFt(index: number, item) {
    return index;
  }
}
