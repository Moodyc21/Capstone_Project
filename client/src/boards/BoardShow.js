import React, { Component } from 'react'
import axios from 'axios'
import google from 'google'
import GoogleImages from 'google-images'
import SearchBar from '../search/SearchBar.js'
import SearchResults from '../search/SearchResults.js'
import styled from 'styled-components'

// const GoogleImages = require('google-images');
const Cork = styled.div`
    background-position: center;
    height: 80vh;
    width: 100vw;
    background-image: url('https://i.imgur.com/GL50pfJ.png');
    background-repeat: no-repeat;


`

    
class BoardShow extends Component {

    state = {
       
        board: [],
       
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
               <Cork>
                   <div>












                   </div>
               </Cork>
               <div>{this.pics}</div>
               <div><SearchBar getImages={this.props.getImages}/></div>
               <div><SearchResults boardId={this.props.match.params.id} addSearchImage={this.props.addSearchImage} searchResults={this.props.searchResults}/></div>
               </div> 
        )
    }

}

export default BoardShow