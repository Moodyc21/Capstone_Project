import React, { Component } from 'react'
import NewBoardForm from './NewBoardForm.js'


class NewBoard extends Component {

    constructor() {
        super()
        this.state = {
            isHidden: true
        }
    }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    closeForm () {
        this.setState({
            isHidden: true
        })
    }

    render() {
        return(
            <div>
                <button onClick={this.toggleHidden.bind(this)}>(+)</button>
                {!this.state.isHidden && <NewBoardForm closeForm={this.closeForm.bind(this)} createBoard={this.props.createBoard}/>}
            </div>

        )
    }
}



export default NewBoard