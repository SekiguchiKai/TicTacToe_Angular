import { Injectable } from '@angular/core';

import { MiniMaxService } from './minimax.service';
import { BoardService } from './board.service';

/**
 * CPUのプレーヤーを表すためのクラス
 */
@Injectable()
export class CpuService {

    /**
     * コンストラクタ
     * @param {MiniMax} miniMax - MiniMaxクラスのインスタンス
     */
    constructor(private miniMax: MiniMaxService) {

    }

    /**
     * 打ち手を打つためのメソッド
     * @param {number} depth -  読みの深さ
     * @param {Board} board -  Boardクラスのインスタンス
     * @return {MiniMaxResult} 打ち手を置くのに最適なセルの場所とそこに打ち手を置いた場合の点数のオブジェクト型リテラル
     */
    doMove(depth: number, board: BoardService): any {
        // TODOここのanyを(MiniMaxResultに)
        const maxNum = 9999999999;
        const minNum = -9999999999;
        const cellObj = this.miniMax.calcMiniMax(depth, board, '×', minNum, maxNum);

        board.putMove(cellObj.indexValue, '×');
        return cellObj;
    }
}