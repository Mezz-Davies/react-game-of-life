export const countLivingNeighboursOfCell = (board:boolean[][], x:number, y:number) => {
    let neighbourCount = 0;
    const iMin = x - 1 >= 0 ? x-1 : 0;
    const iMax = x + 1 < board.length ? x+1 : board.length - 1;
    const jMin = y - 1 >= 0 ? y-1 : 0;
    const jMax = y + 1 < board[x].length ? y+1 : board[x].length - 1;
    for( let i = iMin; i <= iMax; i++ ){
        for( let j = jMin; j <= jMax; j++ ){
            if( i !== x || j !== y) {
                if( board[i][j]){
                    neighbourCount++;
                }
            }
        }
    }
    return neighbourCount;
}