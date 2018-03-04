import React, { Component } from 'react'
import axios from 'axios'
import google from 'google'
import GoogleImages from 'google-images'
import SearchBar from '../search/SearchBar.js'
import SearchResults from '../search/SearchResults.js'
import styled from 'styled-components'
import Draggable from 'react-draggable'

// const GoogleImages = require('google-images');
const Cork = styled.div`
    /* background-position: center;
    height: 80vh;
    width: 100vw;
    background-image: url('https://i.imgur.com/GL50pfJ.png');
    background-repeat: no-repeat; */
    img {
        height: 150px;
        width: 150px;
        border: 2px solid white;
        border-radius: 5%;
    }
`

// const Draggable = window.ReactDraggable
    
class BoardShow extends Component {
    state = {

        board: [],
        images: []
    }

    getInitialState() {
        return {
          deltaPosition: {
            x: 0, y: 0
          },
          controlledPosition: {
            x: -400, y: 200
          }
        };
      }

      handleDrag(e, ui) {
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
      }
    
      // For controlled component
      adjustXPos(e) {
        e.preventDefault();
        e.stopPropagation();
        const {x, y} = this.state.controlledPosition;
        this.setState({controlledPosition: {x: x - 10, y}});
      }
    
      adjustYPos(e) {
        e.preventDefault();
        e.stopPropagation();
        const {controlledPosition} = this.state;
        const {x, y} = controlledPosition;
        this.setState({controlledPosition: {x, y: y - 10}});
      }
    
      onControlledDrag(e, position) {
        const {x, y} = position;
        this.setState({controlledPosition: {x, y}});
      }
    
      onControlledDragStop(e, position) {
        this.onControlledDrag(e, position);
        this.onStop();
      }

    getBoardImages = async(boardId) => {
        try{
           
            const response = await axios.get(`/boards/${boardId}/images`)
            console.log("Board Images:", response)
            this.setState({images: response.data}) 
        } catch (error) {
            console.log(error)
            return []
        }
    }
    addSearchImage = async(boardId, image) => {
        try {
            const payload = {
                board_id: boardId,
                link: image
            }
            const response = await axios.post(`/boards/${boardId}/images`, payload)
            const newImages = await this.getBoardImages()
            // this.setState({images: newImages})
            console.log("Did I add image to db:", response)
            console.log("Image board ID:", boardId)
            
        } catch (error) {
            console.log(error)
            return []
        }
    }
    deleteImage = async(imageId) => {
        try{
            const boardId = this.props.match.params.id
            await axios.delete(`/boards/${boardId}/images/${imageId}`)
            const newImages = await this.getBoardImages()
            
        } catch (error) {
            console.log(error)
        }
    }

    async componentWillMount () {
        const boardId = this.props.match.params.id
        const thisBoard = await this.props.getOneBoard(boardId)
        const images = await this.getBoardImages(thisBoard)
        console.log("This is the board:", thisBoard)
        this.setState({board: thisBoard})     
    }
 
    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        const {deltaPosition, controlledPosition} = this.state;
        console.log("Creating images Array")
        const images = this.state.images.map((image) => {
            return (

                <Draggable {...dragHandlers}>
                 <div className="box"><img src={image.link} alt="Board Image"/><button onClick = {() => this.deleteImage(image.id)}>(X)</button></div>
                </Draggable> 
                         
            )
        })

        console.log("Images Array after mapping:", images)
    
        return( 
            <div>
                
                <div>
               <h1>{this.state.board.name}</h1> 
               <h2>{this.state.board.year}</h2>
               </div>
               <Cork>  
                {images}  
               </Cork>
               <div>{this.pics}</div>
               <div><SearchBar getImages={this.props.getImages}/></div>
               <div><SearchResults boardId={this.props.match.params.id} addSearchImage={this.addSearchImage} searchResults={this.props.searchResults}/></div>
               </div> 
        )
    }

}

export default BoardShow