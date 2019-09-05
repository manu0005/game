import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {C} from '../ReversiDefinitions';

@Component({
  selector: 'app-pion',
  templateUrl: './pion.component.html',
  styleUrls: ['./pion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PionComponent implements OnInit {
  @Input() typeCellule: C = C.Empty;

  constructor() { }

  ngOnInit() {
    console.log('Encore un pion');
  }

  get color(): string {
    switch (this.typeCellule) {
      case C.Empty:
        return 'vide';
      case C.Player1:
        return 'Player1';
      default:
        return 'Player2';
    }
  }
}
