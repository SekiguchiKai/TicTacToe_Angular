import { Injectable } from '@angular/core';

/**
 * ゲーム盤を表すためのクラス
 */
@Injectable()
export class BoardService {

    /**
     * ゲーム盤を表す
     */
    private _gameBoard: string[];



    constructor() {
        const ARRAY_SIZE = 9;

        // 二次元配列化
        this._gameBoard = new Array(ARRAY_SIZE);

        // 二次元配列初期化
        this.clearGameBoard();
    }

    public get arraySize(): number {
        return this._gameBoard.length;
    }


    /**
     * ゲーム盤の指定箇所に打ち手を加えるためのメソッド
     * @param {number} index - 打ち手を加える場所
     * @param {string} move - 打ち手
     */
    public putMove(index: number, move: string): void {
        this._gameBoard[index] = move;
    }

    /**
      * ゲーム盤の指定箇所の打ち手を取得するためのメソッド
      * @param {number} index - 打ち手を取得する場所
      * @return {string} move - 打ち手
      */
    public getMove(index: number): string {
        return this._gameBoard[index];
    }

    /**
      * ゲーム盤を取得するためのメソッド
      * @return {string[][]} 打ち手
      */
    public getGameBoardState(): string[] {
        return this._gameBoard.concat();
    }

    /**
    * ゲーム盤を初期化するためのメソッド
    */
    public clearGameBoard(): void {
        for (let index = 0; index < this._gameBoard.length; index++) {
            this._gameBoard[index] = ' ';
        }
    }
}
