import { Injectable } from '@angular/core';


@Injectable()
export class ScoreCalculatorService {
    private gameBoard: string[];
    private movesArray: string[];

    private totalScore: number;

    constructor() {
        this.movesArray = new Array(9);
        this.movesArray = new Array(3);
    }


    /**
     * 得点の計算を行うためのメソッド
     * @param {string[]} gameBoard - ゲーム盤
     * @return {number} 合計得点
     */
    calcScore(): number {
        // row
        const ROW1 = 0;
        this.calcRow(ROW1);
        const ROW2 = 3;
        this.calcRow(ROW2);
        const ROW3 = 6;
        this.calcRow(ROW3);

        // column
        const COLUMN1 = 0;
        this.calcColumn(COLUMN1);
        const COLUMN2 = 3;
        this.calcColumn(COLUMN2);
        const COLUMN3 = 6;
        this.calcColumn(COLUMN3);


        // 左斜め
        let maxNum = 8;
        let addedNum = 4;
        for (let idx = 0; idx < maxNum; idx = idx + addedNum) {
            this.movesArray[idx] = this.gameBoard[idx][idx];
        }
        this.totalScore += this.calcLineScore(this.movesArray);


        // 右斜め
        maxNum = 6;
        addedNum = 2;
        for (let idx = 2; idx < maxNum; idx = idx + addedNum) {
            this.movesArray[idx] = this.gameBoard[idx];
        }
        this.totalScore += this.calcLineScore(this.movesArray);

        return this.totalScore;
    }

    private calcRow(startIdx: number) {
        let i = 0;
        const MAX_TRIAL = 3;
        for (let index = startIdx; i < MAX_TRIAL; index++) {
            this.movesArray[index] = this.gameBoard[index];
            i++;
        }
        this.totalScore += this.calcLineScore(this.movesArray);

    }

    private calcColumn(startIdx: number) {
        let i = 0;
        const MAX_TRIAL = 3;
        const ADDED_NUM = 3;
        for (let index = startIdx; index < MAX_TRIAL; index = index + ADDED_NUM) {
            this.movesArray[index] = this.gameBoard[index];
            i++;
        }
        this.totalScore += this.calcLineScore(this.movesArray);

    }



    /**
     * 1ラインの得点を計算するためのメソッッド
     * @param {string[]} movesArray - 打ち手を格納するための配列
     * @return {number} 得点
     */
    calcLineScore(movesArray: string[]): number {
        let score = 0;

        // 1つ目
        if (movesArray[0] === '×') {
            score = 1;
        } else if (movesArray[0] === '○') {
            score = -1;
        }

        // 2つ目
        if (movesArray[1] === '× ') {
            if (score === 1) {
                score = 10;
            } else if (score === -1) {
                return 0;
            } else {
                score = 1;
            }
        } else if (movesArray[1] === '○') {
            if (score === -1) {
                score = -10;
            } else if (score === 1) {
                return 0;
            } else {
                score = -1;
            }
        }

        // 3つ目
        if (movesArray[2] === '×') {
            if (score > 0) {
                score *= 10;
            } else if (score < 0) {
                return 0;
            } else {
                score = 1;
            }
        } else if (movesArray[2] === '○') {
            if (score < 0) {
                score *= 10;
            } else if (score > 1) {
                return 0;
            } else {
                score = -1;
            }
        }
        return score;
    }
}