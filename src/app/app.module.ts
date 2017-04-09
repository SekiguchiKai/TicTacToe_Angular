import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BoardService } from './service/board.service';
import { CpuService } from './service/cpu.service';
import { JudgeService } from './service/judge.service';
import { MiniMaxService } from './service/minimax.service';
import { ScoreCalculatorService } from './service/scorecalculator.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [BoardService, CpuService, JudgeService, MiniMaxService, ScoreCalculatorService],
  // providers: [BoardService, JudgeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
