import React, { Component } from 'react'
import SignUpSignInForm from './SignUpSignInForm.js'


class SignUp extends Component {

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

    render() {
        return(
            <div>
                <button onClick={this.toggleHidden.bind(this)}>Sign Up</button>
                {!this.state.isHidden && <SignUpSignInForm signUp={this.props.signUp}/>}
            </div>

        )
    }
}



export default SignUp