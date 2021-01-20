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
        stepCount, setStepCount, myColor} = props;
    const [myRow, myCol] = myPosition.split('@');

    const handleMouseEnter = e => {
        const state = record[row][column]
        if (state === 0) {
            stone[row][column] = (myColor==='black')? black_stone: white_stone;
            e.target.src = stone[row][column]
            setStone(stone)
            e.target.style["opacity"] = 0.5
        }
    }

    const handleMouseLeave = e => {
        const state = record[row][column]
        if (state === 0) {
            stone[row][column] = empty_stone
            e.target.src = stone[row][column]
            setStone(stone)
            e.target.style["opacity"] = 1
        }
    }


    const handleOnClick = e => {
        if (myColor === 'black') { // BLACK
            record[row][column] = stepCount;
            e.target.style["opacity"] = 1;
            // if (myRow !== -1 && myColumn !== -1)
            //     color[curPosition.row][curPosition.column] = white_stone       
            stone[row][column] = black_stone_focus     
        }
        else { // WHITE
            record[row][column] = stepCount;
            e.target.style["opacity"] = 1;
            stone[row][column] = white_stone_focus     
        }
        setMeToPlay(false);
        setRecord(record)
        setStone(stone)
        setMyPosition(`${row}@${column}`)
    }

    return <img src={stone[row][column]} className="grid"
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOnClick} />
}

export default Grid
