export interface Coordinate {
    x : number,
    y : number
}

export interface CoordinateLookup {
    [id: string] : Coordinate
}