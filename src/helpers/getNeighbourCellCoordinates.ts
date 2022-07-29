import { Coordinate } from "./types";

export const getNeighbourCellCoordinates = (board: boolean[][], x: number, y: number) => {
    const neighbourCells: Coordinate[] = [];
    const iMin = x - 1 >= 0 ? x-1 : 0;
    const iMax = x + 1 < board.length ? x+1 : board.length - 1;
    const jMin = y - 1 >= 0 ? y-1 : 0;
    const jMax = y + 1 < board[x].length ? y+1 : board[x].length - 1;
    for( let i = iMin; i <= iMax; i++ ){
        for( let j = jMin; j <= jMax; j++ ){
            if( i !== x || j !== y) {
                neighbourCells.push({x:i, y:j});
            }
        }
    }
    return neighbourCells;
}