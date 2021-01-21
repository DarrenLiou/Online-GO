import React, {useState} from 'react'

import black_stone from '../img/black-stone.png'
import white_stone from '../img/white-stone.png'
import black_stone_focus from '../img/black-stone-focus.png'
import white_stone_focus from '../img/white-stone-focus.png'
import empty_stone from '../img/empty-stone.png'
import '../style.css'

const Grid = props => {
    const {row, column, boardSize, record, setRecord, meToPlay, 
        setMeToPlay, myPosition, setMyPosition, stone, setStone, 
        stepCount, setStepCount, myColor, opponentPosition} = props;
    const [myRow, myCol] = myPosition.split('@');

    const handleMouseEnter = e => {
        if(!meToPlay)return;
        const state = record[row][column]
        if (state === 0) {
            stone[row][column] = (myColor==='black')? black_stone: white_stone;
            e.target.src = stone[row][column]
            setStone(stone)
            e.target.style["opacity"] = 0.5
        }
    }

    const handleMouseLeave = e => {
        if(!meToPlay)return;
        const state = record[row][column]
        if (state === 0) {
            stone[row][column] = empty_stone
            e.target.src = stone[row][column]
            setStone(stone)
            e.target.style["opacity"] = 1
        }
    }


    const handleOnClick = e => {
        const [opponentRow, opponentCol] = opponentPosition.split('@');
        if(!meToPlay)return;
        if(record[row][column] !== 0)return;
        if (myColor === 'black') { // BLACK
            record[row][column] = stepCount;
            e.target.style["opacity"] = 1;    
            stone[row][column] = black_stone_focus     
            if(opponentRow!=='-1'&&opponentCol!=='-1'){
                stone[opponentRow][opponentCol] = white_stone;
            }
        }
        else { // WHITE
            record[row][column] = stepCount;
            e.target.style["opacity"] = 1;
            stone[row][column] = white_stone_focus 
            if(opponentRow!=='-1'&&opponentCol!=='-1'){
                stone[opponentRow][opponentCol] = black_stone;
            }    
        }
        setStepCount(stepCount+1);
        setMeToPlay(false);
        setRecord(record)
        setStone(stone)
        setMyPosition(`${row}@${column}`)
    }

    return <img src={stone[row][column]} className="grid"
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOnClick} />
}

export default Grid
