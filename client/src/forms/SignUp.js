import React, { Component } from 'react'
import SignUpSignInForm from './SignUpSignInForm.js'


class SignUp extends Component {

    constructor() {
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
                <div>
                {this.props.signedUp ? null : <div><h2>Or</h2></div> }
                </div>
                <div>
                {this.props.signedUp ? null : <button onClick={this.toggleHidden.bind(this)}>Sign Up</button>}
               </div>
               {this.props.signedUp ? null :
                <div>
                {!this.state.isHidden && <SignUpSignInForm signUp={this.props.signUp}/>}
               </div>
               }
            </div>

        )
    }
}



export default SignUp