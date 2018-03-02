import React, { Component } from 'react'
import SignUpSignInForm from './SignUpSignInForm.js'
import RaisedButton from 'material-ui/RaisedButton';


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
                {this.props.signedIn ? null :
                <div>
                {this.props.signedUp ? null : <div><h2>Or</h2></div> }
                </div>
                }
                {this.props.signedIn ? null :
                <div>
                {this.props.signedUp ? null : <RaisedButton onClick={this.toggleHidden.bind(this)}>Sign Up</RaisedButton>}
               </div>
                }
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