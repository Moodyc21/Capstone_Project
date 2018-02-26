import React from 'react'
import Board from "./Board"

const BoardsList = (props) => {

    const boards = props.boards.map((board) => {
        return (
            <Board {...board} deleteBoard={props.deleteBoard} key={board.id}/>
        )
    })
    return (
        <div>
            <h1>Vision Boards</h1>

            {props.boards.length > 0 ? boards : null}
        </div>
    )
}

export default BoardsList