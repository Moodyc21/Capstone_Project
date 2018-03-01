import React, { Component } from 'react'
import axios from 'axios'

class BoardShow extends Component {

    state = {
        id: '',
        board: [],
        name: '',
        year: '',
        image: '', 
        quote: '', 
        goal: ''
    }

    async componentWillMount () {
        const boardId = this.props.match.params.id
        const thisBoard = await this.props.getOneBoard(boardId)
        console.log("This is the board:", thisBoard)
        this.setState({board: thisBoard})
    
    }



    render() {


        return( 
            <div>
                <div>jhbsejkdbsbcvsdk</div>
               <h1>{this.state.board.name}</h1> 
               <h2>{this.state.board.year}</h2>
            </div>
        )
    }
}

export default BoardShow