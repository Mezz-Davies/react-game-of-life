export const isAliveNextIteration = (isAlive : boolean, livingNeighbourCount: number) => {
    if(isAlive){
        if(livingNeighbourCount === 2 || livingNeighbourCount === 3 ){
            return true;
        }
    } else {
        if(livingNeighbourCount === 3){
            return true;
        }
    }
    return false;
}