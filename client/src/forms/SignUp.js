import React, { Component } from 'react'
import SignUpSignInForm from './SignUpSignInForm.js'


class SignUp extends Component {

    constructor(props) {
        super()
        this.state = {
            isHidden: true,
        
        
        }
    
    }
    // componentWillMount() {
    //     this.setState({signedIn: this.props.signedIn})
        
    // }

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    

    render() {
        return(
            <div>
                
                {!this.props.signedIn ? <button onClick={this.toggleHidden.bind(this)}>Sign Up</button> : null}
                {!this.state.isHidden && <SignUpSignInForm signUp={this.props.signUp}/>}
            </div>

        )
    }
}



export default SignUp