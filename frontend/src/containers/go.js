import React, {useState} from 'react'

import Board from '../components/board.js'
import Line from '../components/line.js'
import Index from '../components/index.js'
import white_stone from '../img/white-stone.png'

import '../style.css'

const boardSize = 19

const Go = () => {
    const [record, setRecord] = useState(Array.from(Array(boardSize), _ => Array(boardSize).fill(0))) // EMPTY, BLACK, WHITE = 0, 1, 2
    const [curPlayer, setCurPlayer] = useState(0) // BLACK, WHITE = 0, 1
    const [curPosition, setCurPosition] = useState({row: -1, column: -1})
    const [color, setColor] = useState(Array.from(Array(boardSize), _ => Array(boardSize).fill(white_stone))) // EMPTY, BLACK, WHITE = 0, 1, 2

    const updateRecord = newRecord => setRecord(newRecord)
    const updateCurPlayer = newCurPlayer => setCurPlayer(newCurPlayer)
    const updateCurPosition = newPosition => setCurPosition(newPosition)
    const updateColor = newColor => setColor(newColor)

    return (
        <div>
            <h1 className="title">Go game</h1>
            <div className="board-root">
                <Board boardSize={boardSize} record={record} setRecord={updateRecord} curPlayer={curPlayer} 
                setCurPlayer={updateCurPlayer} curPosition={curPosition} setCurPosition={updateCurPosition}
                color={color} setColor={updateColor} />
                <Line boardSize={boardSize - 1} />
                <Index boardSize={boardSize} />
            </div>
        </div>
    )
}

export default Go
