import React from 'react'
import Board from "./Board"
import styled from 'styled-components'


const Box = styled.div`
    background: #fff;
      border: 3px solid #999;
      border-radius: 5px;
      width: 180px;
      height: 180px;
      margin: 10px;
      padding: 10px;
      float: left;
    `

const BoardsList = (props) => {

    const boards = props.boards.map((board) => {
        return (
            <Box>
            <Board {...board} getBoards={props.getBoards} deleteBoard={props.deleteBoard} key={board.id}/>
            </Box>
        )
    })
    return (
        <div>
            <h1>Vision Boards</h1>
        
            {props.boards.length > 0 ? boards : null}
        
        <Box>
            <h2>Add Board(+)</h2>
        </Box>

        </div>
    )
}

export default BoardsList