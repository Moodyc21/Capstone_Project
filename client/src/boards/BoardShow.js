import React, { Component } from 'react'
import axios from 'axios'
import google from 'google'
import GoogleImages from 'google-images'
import SearchBar from '../search/SearchBar.js'
import SearchResults from '../search/SearchResults.js'

// const GoogleImages = require('google-images');


    
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
                <div>
               <h1>{this.state.board.name}</h1> 
               <h2>{this.state.board.year}</h2>
               </div>
               <div>{this.pics}</div>
               <div><SearchBar getImages={this.props.getImages}/></div>
               <div><SearchResults searchResults={this.props.searchResults}/></div>
               </div> 
        )
    }

}

export default BoardShow