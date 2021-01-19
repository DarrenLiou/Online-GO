import React, {useState} from 'react'

import black_stone from '../img/black-stone.png'
import white_stone from '../img/white-stone.png'
import black_stone_focus from '../img/black-stone-focus.png'
import white_stone_focus from '../img/white-stone-focus.png'
import '../style.css'

const Grid = props => {
    const [color, setColor] = useState(white_stone)
    const setStones = newStones => {
        
    }

    const handleMouseEnter = e => {
        const state = props.record[props.row][props.column]
        const curPlayer = props.curPlayer
        if (state === 0) {
            setColor((curPlayer === 0)? black_stone : white_stone)
            e.target.style["opacity"] = 1;
        }
    }

    const handleMouseLeave = e => {
        const state = props.record[props.row][props.column]
        if (state === 0) {
            setColor("")
            e.target.style["opacity"] = 0;
        }
    }

    const handleOnClick = e => {
        const record = props.record
        const curPlayer = props.curPlayer
        if (curPlayer === 0) { // BLACK
            record[props.row][props.column] = 1
            props.setCurPlayer(1)
        }
        else {
            record[props.row][props.column] = 2
            props.setCurPlayer(0)
        }
        props.setRecord(record)
        props.setCurPosition({row: props.row, column: props.column})
        console.log(props.curPosition)
    }

    const checkFocus = color => {
        if (color === black_stone)
            setColor((props.curPosition === {row: props.row, column: props.column})? black_stone_focus : black_stone)
        else
            setColor((props.curPosition === {row: props.row, column: props.column})? white_stone_focus : white_stone)
    }
    
    if (props.row % 6 === 3 && props.column % 6 === 3)
        return <img src={color} className="grid star"
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOnClick} />
    else
        return <img src={color} className="grid"
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOnClick} />
}

export default Grid
