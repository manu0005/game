import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PionComponent } from './pion/pion.component';
import {ReversiService} from './reversi.service';
import {Agent, factoryAgent} from './Agent';
import {C} from './ReversiDefinitions';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ReversiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
