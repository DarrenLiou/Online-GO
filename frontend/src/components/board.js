import React from 'react'

import Grid from './grid.js'

const Board = props => {
    const BOARD_SIZE = props.boardSize
    const board = []
    for (let i = 0; i < BOARD_SIZE; i++) {
        const column = []
        for (let j = 0; j < BOARD_SIZE; j++) {
            column.push(<Grid color="black" boardSize={props.boardSize} row={i} column={j} record={props.record}
                setRecord={props.setRecord} curPlayer={props.curPlayer} setCurPlayer={props.setCurPlayer}
                curPosition={props.curPosition} setCurPosition={props.setCurPosition} stones={props.stones}
                setStones={props.setStones} />)
        }
        board.push(<div className="board-column">{column}</div>)
    }

    return <div className="board">{board}</div>
}

export default Board
