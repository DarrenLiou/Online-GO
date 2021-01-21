import React from 'react'

const Index = props => {
    const BOARD_SIZE = props.boardSize
    const numbers = []
    const alphabets = []
    for (let i = 0; i < BOARD_SIZE; i++) {
        numbers.push(<div className="index-element" key={i+'N'}>{BOARD_SIZE - i}</div>)
        if (i <= 7)
            alphabets.push(<div className="index-element" key={i}>{String.fromCharCode(65 + i)}</div>)
        else
            alphabets.push(<div className="index-element" key={i}>{String.fromCharCode(66 + i)}</div>)
    }

    return (
        <div className="index">
            <div className="index-left">{numbers}</div>
            <div className="index-right">{numbers}</div>
            <div className="index-top">{alphabets}</div>
            <div className="index-bottom">{alphabets}</div>
        </div>
    )
}

export default Index
