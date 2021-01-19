import React from 'react'

const Line = props => {
    const BOARD_SIZE = props.boardSize
    const lines = []
    for (let i = 0; i < BOARD_SIZE; i++) {
        const column = []
        for (let j = 0; j < BOARD_SIZE; j++) {
            let classes = "line-element "

            if (i === 0)
                classes += "line-left "
            if (i === BOARD_SIZE - 1)
                classes += "line-right "
            if (j === 0)
                classes += "line-top "
            if (j === BOARD_SIZE - 1)
                classes += "line-bottom "
            column.push(<div className={classes} />)
        }
        lines.push(<div className="line-column">{column}</div>)
    }

    return <div className="line">{lines}</div>
}

export default Line
