import React from 'react'



const Board = (props) => {
    const deleteBoard = () => {
        props.deleteBoard(props.id)
    }
    // const updatePost = () => {
    //     props.updatePost(props.id)
    // }


    return (
        
        <div>
            <div>
                <button onClick={deleteBoard}>(X)</button>
                {/* <button onClick={updatePost}>Edit</button> */}
         </div>
            <div><h2>{props.name}</h2></div>
            <div>{props.year}</div>
            
         </div>
    )
}

export default Board