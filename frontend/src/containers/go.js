import React, {useState, useEffect, useRef} from 'react'
import {makeMove} from '../axios.js';

import Board from '../components/board.js'
import Line from '../components/line.js'
import Index from '../components/index.js'
import Star from '../components/star.js'
import white_stone from '../img/white-stone.png'
import empty_stone from '../img/empty-stone.png'

import '../style.css'

const boardSize = 19

const Go = (props) => {
    const {color: myColor, opponent: myOpponentName, stepReceived: opponentStep, boardId, userId} = props;
    const [record, setRecord] = useState(Array.from(Array(boardSize), _ => Array(boardSize).fill(0))) // EMPTY, BLACK, WHITE = 0, 1, 2
    const [stepCount, setStepCount] = useState(0);
    const [curPlayer, setCurPlayer] = useState(0) // BLACK, WHITE = 0, 1 
    const [curPosition, setCurPosition] = useState({row: -1, column: -1})
    const [color, setColor] = useState(Array.from(Array(boardSize), _ => Array(boardSize).fill(empty_stone)))

    const updateRecord = newRecord => setRecord(newRecord)
    const updateCurPlayer = newCurPlayer => setCurPlayer(newCurPlayer)
    const updateCurPosition = newPosition => setCurPosition(newPosition)
    const updateColor = newColor => setColor(newColor)
    // const gridRefs = [];
    // useEffect(()=>{
    //     for (let i=0; i<boardSize*boardSize; i++){
    //         gridRefs.push(useRef());
    //     }
    // }, [])
    useEffect(()=>{
        console.log('In use effect "go.js"', myColor, curPlayer);
        if ((curPlayer === 1 && myColor === 'black') || (curPlayer === 0 && myColor === 'white')){
            makeMove(boardId, userId, {flag: 'step', pos:{row: curPosition.row, col: curPosition.column}})
        }
    }, [curPosition])

    useEffect(() => {
        setStepCount(stepCount+1);
        console.log('In use Effect props changed, opponent pos:', opponentStep);
            
    }, [opponentStep])

    return (
        <div>
            <h1 className="title">Go game</h1>
            <h2>My color : {myColor}</h2>
            <div className="board-root">
                <Board boardSize={boardSize} record={record} setRecord={updateRecord} curPlayer={curPlayer} 
                setCurPlayer={updateCurPlayer} curPosition={curPosition} setCurPosition={updateCurPosition}
                color={color} setColor={updateColor} stepCount={stepCount} setStepCount={setStepCount}/>
                <Line boardSize={boardSize} />
                <Index boardSize={boardSize} />
                <Star boardSize={boardSize} />
            </div>
        </div>
    )
}

export default Go
