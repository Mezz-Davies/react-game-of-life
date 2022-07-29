import { Coordinate } from "./types";

export const makeCellsFromBoard = (board: boolean[][]) => {
    const cells:Coordinate[] = [];
    for(let i=0; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
            if(board[i][j]){
                cells.push({x:i, y:j});
            }
        }
    }
    return cells;
}