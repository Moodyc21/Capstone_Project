import React from 'react'

const Board = (props) => {
    return (
        <div>
            <div><h2>{props.name}</h2></div>
            <div>{props.year}</div>
        </div>
    )
}

export default Board