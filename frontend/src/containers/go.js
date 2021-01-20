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
    const {color: myColor, opponent: myOpponentName, stepReceivedStr: opponentStepStr, 
         boardId, userId} = props;
    const [record, setRecord] = useState(Array.from(Array(boardSize), _ => Array(boardSize).fill(0))) // EMPTY, BLACK, WHITE = 0, 1, 2
    const [stepCount, setStepCount] = useState(1);
    // const [curPlayer, setCurPlayer] = useState(0) // BLACK, WHITE = 0, 1 timer running
    // const [curPosition, setCurPosition] = useState({row: -1, column: -1})
    const [meToPlay, setMeToPlay] = useState(myColor==='black'? true:false);
    const [myPositon, setMyPosition] = useState('-1@-1');
    const [opponentPosition, setOpponentPosition] = useState('-1@-1');
    const [stone, setStone] = useState(Array.from(Array(boardSize), _ => Array(boardSize).fill(empty_stone)))

    // const updateRecord = newRecord => setRecord(newRecord)
    // const updateCurPlayer = newCurPlayer => setCurPlayer(newCurPlayer)
    // const updateCurPosition = newPosition => setMyPo(newPosition)
    // const updateColor = newColor => setColor(newColor)
    // const gridRefs = [];
    // useEffect(()=>{
    //     for (let i=0; i<boardSize*boardSize; i++){
    //         gridRefs.push(useRef());
    //     }
    // }, [])
    
    // useEffect(()=>{
    //     if (curPosition.row === -1) return;
    //     console.log('In use effect "go.js"', myColor, curPlayer);
    //     if ((curPlayer === 1 && myColor === 'black') || (curPlayer === 0 && myColor === 'white')){
    //         makeMove(boardId, userId, {flag: 'step', pos:{row: curPosition.row, col: curPosition.column} })
    //     }
    // }, [curPosition])

    // useEffect(() => {
    //     if (opponentStepStr === '-1@-1') return;
    //     console.log('In use Effect props changed, opponent pos:', opponentStepStr);
    //     // setStepCount(stepCount+1);
    //     const [row, col] = opponentStepStr.split('@');
    //     setCurPosition({row: row, column: col});
    //     // setCurPlayer(1-curPlayer);
    //     // if 
    //     // color[opponentStep.row][opponentStep.col] = 
    // }, [opponentStepStr])

    return (
        <div>
            <h1 className="title glow-on-hover">Go game</h1>
            <h2>My color : {myColor}</h2>
            <div className="board-root">
                <Board boardSize={boardSize} record={record} setRecord={setRecord} meToPlay={meToPlay}
                setMeToPlay={setMeToPlay} myPosition={myPositon} setMyPosition={setMyPosition}
                stone={stone} setStone={setStone} stepCount={stepCount} setStepCount={setStepCount} myColor={myColor}/>
                <Line boardSize={boardSize} />
                <Index boardSize={boardSize} />
                <Star boardSize={boardSize} />
            </div>
        </div>
    )
}

export default Go
