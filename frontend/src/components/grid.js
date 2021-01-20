import React, {useState} from 'react'

import black_stone from '../img/black-stone.png'
import white_stone from '../img/white-stone.png'
import black_stone_focus from '../img/black-stone-focus.png'
import white_stone_focus from '../img/white-stone-focus.png'
import '../style.css'

const Grid = props => {
    const handleMouseEnter = e => {
        const state = props.record[props.row][props.column]
        const curPlayer = props.curPlayer
        const color = props.color
        if (state === 0) {
            color[props.row][props.column] = (curPlayer === 0)? black_stone: white_stone
            e.target.src = color[props.row][props.column]
            e.target.style["opacity"] = 0.5;
            props.setColor(color)
        }
    }

    const handleMouseLeave = e => {
        const state = props.record[props.row][props.column]
        if (state === 0) {
            e.target.style["opacity"] = 0;
        }
    }

    const handleOnClick = e => {
        const record = props.record
        const curPlayer = props.curPlayer
        const color = props.color
        const curPosition = props.curPosition

        if (curPlayer === 0) { // BLACK
            record[props.row][props.column] = 1
            e.target.style["opacity"] = 1;
            if (curPosition.row !== -1 && curPosition.column !== -1)
                color[curPosition.row][curPosition.column] = white_stone       
            color[props.row][props.column] = black_stone_focus     
            props.setCurPlayer(1)
        }
        else {
            record[props.row][props.column] = 2
            e.target.style["opacity"] = 1;
            if (curPosition.row !== -1 && curPosition.column !== -1)
                color[curPosition.row][curPosition.column] = black_stone       
            color[props.row][props.column] = white_stone_focus     
            props.setCurPlayer(0)
        }
        props.setRecord(record)
        props.setColor(color)
        props.setCurPosition({row: props.row, column: props.column})
    }

    if (props.row % 6 === 3 && props.column % 6 === 3)
        return <img src={props.color[props.row][props.column]} className="grid star"
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOnClick} />
    else
        return <img src={props.color[props.row][props.column]} className="grid"
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOnClick} />
}

export default Grid
