
export const makeEmptyBoard = (rows : number, cols: number) => {
    const board:boolean[][] = [];
    for(let i=0; i<rows; i++){
        board[i] = [];
        for(let j=0; j<cols; j++){
            board[i][j] = false;
        }
    }
    return board;
}