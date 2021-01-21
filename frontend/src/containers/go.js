import React, {useState, useEffect, useRef} from 'react'
import {makeMove} from '../axios.js';

import Board from '../components/board.js'
import Line from '../components/line.js'
import Index from '../components/index.js'
import Star from '../components/star.js'
import black_stone from '../img/black-stone.png'
import white_stone from '../img/white-stone.png'
import black_stone_focus from '../img/black-stone-focus.png'
import white_stone_focus from '../img/white-stone-focus.png'
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
    const [myPosition, setMyPosition] = useState('-1@-1');
    const [opponentPosition, setOpponentPosition] = useState('-1@-1');
    const [stone, setStone] = useState(Array.from(Array(boardSize), _ => Array(boardSize).fill(empty_stone)))

    const makeSurrender = () => {
        console.log('Surrender Make')
        makeMove(boardId, userId, {flag: 'surrender', pos:{row: -1, col: -1} })
        setMeToPlay(false);
    }
    const makeDone = () => {
        if(!meToPlay) return;
        console.log('Done Make')
        makeMove(boardId, userId, {flag: 'done', pos:{row: -1, col: -1} })
        setMeToPlay(false);
    }

    useEffect(()=>{
        if(opponentStepStr==='-1@-1') return;
        setOpponentPosition(opponentStepStr);
        const [opponentRow, opponentCol] = opponentStepStr.split('@');
        const [myCurRow, myCurCol] = myPosition.split('@');
        record[opponentRow][opponentCol] = stepCount;
        setStepCount(stepCount+1);
        setMeToPlay(true);
        if(myColor==='black'){
            stone[opponentRow][opponentCol] = white_stone_focus
            if(myCurRow!=='-1' &&myCurCol!=='-1'){
                stone[myCurRow][myCurCol] = black_stone;
            }
        }else{
            stone[opponentRow][opponentCol] = black_stone_focus
            if(myCurRow!=='-1' &&myCurCol!=='-1'){
                stone[myCurRow][myCurCol] = white_stone;
            }
        }
        setStone(stone)
    },[opponentStepStr])

    useEffect(()=>{
        if(myPosition==='-1@-1')return;
        if(!meToPlay){
            const [row, col] = myPosition.split('@')
            makeMove(boardId, userId, {flag: 'step', pos:{row: row, col: col} })
        }
    },[myPosition])

    return (
        <div>
            <h1 className="title glow-on-hover">GO game</h1>
            <div className="game-info">
                <h2>My color : {myColor}</h2>
                <h2>My Opponent: {myOpponentName}</h2>
            </div>
            <div className="board-root">
                <Board boardSize={boardSize} record={record} setRecord={setRecord} meToPlay={meToPlay}
                setMeToPlay={setMeToPlay} myPosition={myPosition} setMyPosition={setMyPosition} opponentPosition={opponentPosition}
                stone={stone} setStone={setStone} stepCount={stepCount} setStepCount={setStepCount} myColor={myColor}/>
                <Line boardSize={boardSize} />
                <Index boardSize={boardSize} />
                <Star boardSize={boardSize} />
            </div>
            <button className="surrender" onClick={makeSurrender}>Surrender</button>
            <button className="done" onClick={makeDone}>Done</button>
        </div>
    )
}

export default Go
