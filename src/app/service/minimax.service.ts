import { Injectable } from '@angular/core';

import { ScoreCalculatorService } from './scorecalculator.service';
import { BoardService } from './board.service';
// インターフェース
// export interface MiniMaxResult {
//     indexValue: number;
//     bestScore: number;
// }

// // インターフェース
// export interface CapableMoves {
//     indexValue: number;
// }
/**
 * ミニマックスアルゴリズムを表したクラス
 */
@Injectable()
export class MiniMaxService {

    constructor(private scorecalculator: ScoreCalculatorService) { }

    /**
     * ミニマックスアルゴリズムαβ法を用い、引数で渡された打ち手のプレイヤーに取って最適な点数とゲーム盤の場所を返すメソッド
     * CPUの場合は、最大の点数とその点数を取り得るゲーム盤の場所を返し、USERの場合は、点数とその点数を取り得るゲーム盤の場所を返す
     * <p>
     * このメソッドのアルゴリズム
     * 【CPUの場合】
     * 現在のゲーム木の深さの1個下の階層の点数をMinMaxで取得する
     * その取得した点数が現在保持している一番高い点数（ベストスコア）よりも高い場合は、その点数が保持されるベストスコアとなる
     * <p>
     * 【USERの場合】
     * 現在のゲーム木の深さの1個下の階層の点数をMinMaxで取得する
     * その取得した点数が現在保持している一番低い点数（ベストスコア）よりも低い場合は、その点数が保持されるベストスコアとなる
     *
     * @param {number} depth -探索の深さ
     * @param {Board} board - Boardクラスのインスタンス
     * @param {string} playerSignal - Playerの打ち手 
     * @param {number} alpha - α値
     * @param {number} beta - β値
     * @return {MiniMaxResult} 打ち手を打つのに最適な場所とそこに打ち手を打った場合の点数を格納したオブジェクト型リテラル
     */
    public calcMiniMax(depth: number, board: BoardService, playerSignal: string, alpha: number, beta: number): any {
        // TODOここのanyを変更(インターフェースMiniMaxResultに)

        const capableMovesArray = this.makeCapableMoveArray(board);

        let score;
        let index = -1;

        const gameOverNum = 0;

        // 試合が終了か、深さが0の場合は、スコアを
        if (capableMovesArray.length === gameOverNum || depth === gameOverNum) {

            // ここ要変更
            score = this.scorecalculator.calcScore();


            return { indexValue: index, bestScore: score };
        } else {
            // CPUの点数であるαの方が、βよりも大きい場合、それ以上探索しなくても良い(その時のαが最大なので)ので、探索を打ち切る
            for (const cell of capableMovesArray) {

                board.putMove(cell.indexValue, playerSignal);

                const correctVal = 1;

                if (playerSignal === '×') {

                    score = this.calcMiniMax(depth - correctVal, board, '○', alpha, beta).bestScore;
                    if (score > alpha) {
                        alpha = score;
                        index = cell.indexValue;

                    }
                } else if (playerSignal === '○') {
                    score = this.calcMiniMax(depth - correctVal, board, '×', alpha, beta).bestScore;
                    if (score < beta) {
                        beta = score;
                        index = cell.indexValue;
                    }
                }
                board.putMove(cell.indexValue, ' ');

                if (alpha >= beta) { break; }
            }
        }

        if (playerSignal === '×') {
            return {
                indexValue: index,
                bestScore: alpha
            };
        } else {
            return {
                indexValue: index,
                bestScore: beta
            };
        }
    }

    /**
      * 現在の打ち手を打つことが可能なすべてのゲーム盤の場所をリスト化する（NO_MOVEが存在しているGameBoardの場所）
      *
      * @param {Board} board - Boardクラスのインスタンス
      * @return {capableMovesArrays[]} NO_MOVEが存在するGameBoard上の場所の一覧を格納したオブジェクト型リテラル
      */
    private makeCapableMoveArray(board: BoardService): any {
        // TODOここのanyを変更(インターフェースCapableMoves[]に)
        const capableMovesArray = [];

        for (let index = 0; index < board.arraySize; index++) {
            if (board.getMove(index) === ' ') {
                const cellObj = { indexValue: index };
                capableMovesArray.push(cellObj);
            }
        }
        return capableMovesArray;
    }
}