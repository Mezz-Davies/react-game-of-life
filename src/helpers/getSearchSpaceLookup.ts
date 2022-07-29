// @ts-ignore
import { getNeighbourCellCoordinates } from "./getNeighbourCellCoordinates.ts";
import { Coordinate, CoordinateLookup } from "./types";

export const getSearchSpaceLookup = (cells: Coordinate[], board: boolean[][]) => cells.reduce((cellsLookup: CoordinateLookup, cell : Coordinate) => {
    cellsLookup[`${cell.x},${cell.y}`] = cell;
    getNeighbourCellCoordinates(board, cell.x, cell.y).forEach(neighbourCell => {
        cellsLookup[`${neighbourCell.x},${neighbourCell.y}`] = neighbourCell;
    });
    return cellsLookup;
}, {});