import { Component, OnInit } from '@angular/core';

import { BoardService } from './service/board.service';
import { CpuService } from './service/cpu.service';
import { JudgeService } from './service/judge.service';

const HEROES: string[] = [
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  row1 = [' ', ' ', ' '];
  row2 = [' ', ' ', ' '];
  row3 = [' ', ' ', ' '];
  gameBoard = [this.row1, this.row2, this.row3];


  constructor(private board: BoardService, private cpu: CpuService, private judge: JudgeService) { }
  // constructor(private board: BoardService, private judge: JudgeService) { }
  // constructor(private board: BoardService) { }

  // }

  // clicked(idStr: string) {
  //   // $event.targetでHTMLInputElementを取得
  //   //  event.target.value;
  //   const id = Number(idStr);
  //   const cellMove = this.board.getMove(id);

  //   if (cellMove === MOVE.EMPTY) {
  //     this.board.putMove(id, MOVE.CIRCLE);
  //     window.alert('aaaaaa');
  //   }
  // }

  ngOnInit() {
    this.judge.judgeResult(this.board);
    // this.cpu.doMove(1, this.board);
    // const ROW1 = 0;
    // const ROW2 = 3;
    // const ROW3 = 6;
    // this.initRow(this.row1, this.board.getGameBoardState(), ROW1);
    // this.initRow(this.row2, this.board.getGameBoardState(), ROW2);
    // this.initRow(this.row3, this.board.getGameBoardState(), ROW3);
    window.alert('aaa');
  }

  // initRow(row, gameBoard: string[], startIdx: number) {
  //   let i = 0;
  //   const MAX_NUM = 3;
  //   for (let index = startIdx; i < MAX_NUM; index++) {
  //     row[i] = gameBoard[index];
  //     i++;
  //   }
  // }





}
