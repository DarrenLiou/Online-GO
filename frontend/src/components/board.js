import React from 'react'

import Grid from './grid.js'

const Board = props => {
    const BOARD_SIZE = props.boardSize
    const board = []
    for (let i = 0; i < BOARD_SIZE; i++) {
        const column = []
        for (let j = 0; j < BOARD_SIZE; j++) {
            column.push(<Grid row={i} column={j} {...props} key={i*BOARD_SIZE+j}></Grid>)
        }
        board.push(<div className="board-column" key={i}>{column}</div>)
    }

    return <div className="board">{board}</div>
}

export default Board
