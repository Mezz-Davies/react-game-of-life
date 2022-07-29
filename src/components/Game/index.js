import './Game.css';
import { useRef, useState } from 'react';
import { Cell } from '../Cell';
import { makeEmptyBoard } from '../../helpers/makeEmptyBoard.ts';
import { makeCellsFromBoard } from '../../helpers/makeCellsFromBoard.ts';
import { countLivingNeighboursOfCell } from '../../helpers/countLivingNeighboursOfCell.ts';
import { isAliveNextIteration } from '../../helpers/isAliveNextIteration.ts';
import { getSearchSpaceLookup } from '../../helpers/getSearchSpaceLookup.ts';

const CELL_SIZE=20;
const WIDTH=800;
const HEIGHT=800;
const rows = HEIGHT / CELL_SIZE;
const cols = WIDTH / CELL_SIZE;

export const Game = () => {
    const boardArrayRef = useRef(makeEmptyBoard(rows, cols));
    const timeoutRef = useRef(null);
    const boardDomRef = useRef(null);

    const [cells, setCells] = useState([]);
    const [ tickInterval, setTickInterval ] = useState(100);
    const [ isRunning, setIsRunning ] = useState(false);


    const getElementOffset = () => {
        const rect = boardDomRef.current.getBoundingClientRect();
        const doc = document.documentElement;

        const x = (rect.left + window.pageXOffset) - doc.clientLeft;
        const y = (rect.top + window.pageYOffset) - doc.clientTop
        return {
            x, y
        }
    }

    const handleClick = (event) => {
        const elementOffset = getElementOffset();
        const offsetX = event.clientX - elementOffset.x;
        const offsetY = event.clientY - elementOffset.y;

        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if( x >= 0 && x < rows && y >= 0 && y < cols){
            boardArrayRef.current[x][y] = !boardArrayRef.current[x][y];
        }
        const nextCells = makeCellsFromBoard(boardArrayRef.current);
        setCells(nextCells);
    }

    const runIteration = () => {
        const currentBoard = boardArrayRef.current;
        const nextBoard = makeEmptyBoard(rows, cols);
        const searchSpaceLookup = getSearchSpaceLookup(cells, currentBoard);
        const searchSpaceArray = Object.keys(searchSpaceLookup).map(key=>searchSpaceLookup[key]);
        let livingCellsInNextGeneration = 0;
        searchSpaceArray.forEach(cell=>{
            const {x, y} = cell;
            const isAlive = currentBoard[x][y];
            const livingNeighbourCount = countLivingNeighboursOfCell(currentBoard, x, y);
            let willBeAlive = isAliveNextIteration(isAlive, livingNeighbourCount);
            if(willBeAlive){
                livingCellsInNextGeneration++;
            }
            nextBoard[x][y] = willBeAlive;
        });

        boardArrayRef.current = nextBoard;
        setCells(makeCellsFromBoard(nextBoard));
        if( livingCellsInNextGeneration > 0 ){
            timeoutRef.current = setTimeout(runIteration, tickInterval);
        } else {
            stopGame();
        }
        
    }

    const startGame = () => {
        setIsRunning(true);
        runIteration();
    }
    const stopGame = () => {
        setIsRunning(false);
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }
    }
    const clearBoard = () => {
        if(isRunning){
            stopGame();
        }
        const emptyBoard = makeEmptyBoard(rows, cols);
        setCells(makeCellsFromBoard(emptyBoard));
        boardArrayRef.current = emptyBoard;
    }
    return (
        <div>
            <div className='board' ref={boardDomRef} onClick={handleClick}style={{width:WIDTH, height:HEIGHT, backgroundSize:`${CELL_SIZE}px ${CELL_SIZE}px`}}>
        {cells.map(cell => <Cell x={cell.x} y={cell.y} cell_size={CELL_SIZE} key={`${cell.x},${cell.y}`}/>)}
            </div>
            <div className='controls'>
                Update every <input value={tickInterval} onChange={(event)=>{setTickInterval(event.target.value)}}/> msec
                { isRunning ? 
                    <button className='button' onClick={()=>{stopGame()}}>Stop</button>
                    :
                    <button className='button' onClick={()=>{startGame()}}>Start</button>
                }
                <button className='button' onClick={()=>{clearBoard()}}>Clear</button>
            </div>
        </div>
    );
}