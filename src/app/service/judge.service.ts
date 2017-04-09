import { Injectable } from '@angular/core';

import { BoardService } from './board.service';


/**
 * 勝敗を審判するためのクラス
 */
@Injectable()
export class JudgeService {

    /**
     * 勝敗はついているかを確認し、その結果を返すためのメソッド
     * @param {Board} board - Boardクラスのインスタンス
     * @return {string} 勝敗の結果
     */
    public judgeResult(board: BoardService): string {
        const gameBoard = board.getGameBoardState();

        if (this.judgeWin(gameBoard)) {
            return '勝ち';
        } else if (this.judgeLose(gameBoard)) {
            return '負け';
        } else if (this.judgeDraw(gameBoard)) {
            return '引き分け';
        }
        return ' ';
    }


    /**
     * ユーザーが勝利したかどうかを確認するためのメソッド
     * 縦、横、左斜め、右斜めを走査する
     * @param {string[][]} gameBoard - ゲーム盤
     * @return {boolean} ユーザーが勝利したかどうかの真偽値
     */
    private judgeWin(gameBoard: string[]): boolean {
        return this.judgeRow(gameBoard, '○')
            || this.judgeColumn(gameBoard, '○')
            || this.judgeLeftSlanting(gameBoard, '○')
            || this.judgeRightSlanting(gameBoard, '○');
    }
    /**
     * ユーザーが敗北したかどうかを確認するためのメソッド
     * 縦、横、左斜め、右斜めを走査する
     * @param {string[][]} gameBoard - ゲーム盤
     * @return {boolean} ユーザーが敗北したかどうかの真偽値
     */
    private judgeLose(gameBoard: string[]): boolean {
        return this.judgeRow(gameBoard, '×')
            || this.judgeColumn(gameBoard, '×')
            || this.judgeLeftSlanting(gameBoard, '×')
            || this.judgeRightSlanting(gameBoard, '×');
    }
    /**
     * 引き分けかどうかを確認するためのメソッド
     * @param {string[][]} gameBoard - ゲーム盤
     * @return {boolean} 引き分けかどうかの真偽値
     */
    private judgeDraw(gameBoard: string[]): boolean {
        const MAX_NUM = 9;
        for (let index = 0; index < MAX_NUM; index++) {
            if (gameBoard[index] === ' ') {
                return false;
            }
        }
        return true;
    }
    /**
     * row(横のライン)が引数で指定された打ち手で5連が達成されているか確認するためのメソッド
     * @param {string[][]} gameBoard -  ゲーム盤
     * @param {string} moves - 打ち手
     * @return {boolean} 勝敗が決定したか真偽値
     */
    private judgeRow(gameBoard: string[], moves: string): boolean {
        const ROW1 = 0;
        const ROW2 = 3;
        const ROW3 = 6;

        return this.checkARow(gameBoard, moves, ROW1)
            || this.checkARow(gameBoard, moves, ROW2)
            || this.checkARow(gameBoard, moves, ROW3);
    }
    /**
     * rowにおいて指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値を返すメソッド
     * @param {string[][]} gameBoard - ゲーム盤
     * @param {string} moves - 打ち手
     * @param {number} row - rowのインデックス
     * @param {number} column - columnのインデックス
     * @return {boolean} 指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値
     */
    private checkARow(gameBoard: string[], moves: string, startNum: number): boolean {
        let i = 0;
        const MAX_NUM = 3;
        for (let index = startNum; i < MAX_NUM; index++) {
            if (gameBoard[index] !== moves) {
                return false;
            }
            i++;
        }
        return true;
    }
    /**
     * column(縦のライン)が引数で指定されたMoveで5連が達成されているか確認するためのメソッド
     * @param {string[][]} gameBoard - ゲーム盤
     * @param {string} moves - 打ち手
     * @return {boolean} 勝敗が決定したか真偽値
     */
    private judgeColumn(gameBoard: string[], moves: string): boolean {
        const COLUMN1 = 0;
        const COLUMN2 = 3;
        const COLUMN3 = 6;

        return this.checkAColumn(gameBoard, moves, COLUMN1)
            || this.checkAColumn(gameBoard, moves, COLUMN2)
            || this.checkAColumn(gameBoard, moves, COLUMN3);
    }
    /**
     * columnにおいて指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値を返すメソッド
     * @param {string[][]} gameBoard - ゲーム盤
     * @param {string} moves - 打ち手
     * @param {number} row - rowのインデックス
     * @param {number} column - columnのインデックス
     * @return {boolean} 指定された打ち手が、ゲーム盤上の指定された範囲内で勝敗を決定する数分連続しているかの真偽値
     */
    private checkAColumn(gameBoard: string[], moves: string, startNum: number): boolean {
        let i = 0;
        const maxNum = 3;
        for (let index = startNum; i < maxNum; index = index + 3) {
            if (gameBoard[index] !== moves) {
                return false;
            }
            i++;
        }
        return true;
    }

    /**
     * 左斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
     * @param {string[][]} gameBoard - ゲーム盤
     * @param {string} moves - 打ち手
     * @return {boolean} 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
     */
    private judgeLeftSlanting(gameBoard: string[], moves: string): boolean {
        const MAX_NUM = 8;
        const ADDED_NUM = 4;

        for (let index = 0; index < MAX_NUM; index = index + ADDED_NUM) {
            if (gameBoard[index] !== moves) {
                return false;
            }
        }
        return true;
    }


    /**
      * 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      *
      * @param {string[][]} gameBoard - ゲーム盤
      * @param {string} moves - 打ち手
      * @return {boolean} 右斜めのラインにおいて、引数で受け取った打ち手が5連揃っているかどうかの真偽値を確認するためのメソッド
      */
    private judgeRightSlanting(gameBoard: string[], moves: string): boolean {
        const MAX_NUM = 6;
        const ADDED_NUM = 2;

        for (let index = 2; index < MAX_NUM; index = index + ADDED_NUM) {
            if (gameBoard[index] !== moves) {
                return false;
            }
        }
        return true;
    }
}

