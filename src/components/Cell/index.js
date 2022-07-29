import './Cell.css';

export const Cell = ({x, y, cell_size: size}) => {
    const left = `${size * x+1}px`;
    const top = `${size * y + 1}px`;
    const height = `${size - 1}px`;
    const width = `${size - 1}px`;
    
    return ( <div className="cell" style={{left, top, height, width}}/>)
}

