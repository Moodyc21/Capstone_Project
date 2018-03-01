import React, {Component} from 'react'
import SignUp from '../forms/SignUp.js'

class SignUpLogIn extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: '', 
        signedIn: false
    }

    // signUp = (event) => {
    //     event.preventDefault()
    //     this.props.signUp(
    //         this.state.email,
    //         this.state.password,
    //         this.state.password_confirmation
    //     )
    //     this.setState({signedIn: true})
    // }

    signIn = (event) => {
        event.preventDefault()
        this.props.signIn(
            this.state.email,
            this.state.password
        )
        this.setState({signedIn: true})
    }

    handleChange = (event) => {
        const newState = {...this.state}
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="email">E-mail: </label>
                        <input onChange={this.handleChange} type="text" name="email" value={this.state.email}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.handleChange} type="password" name="password" value={this.state.password}/>
                    </div>
                    {/* <div>
                        <label htmlFor="password_confirmation">Confirm Password: </label>
                        <input onChange={this.handleChange} type="password" name="password_confirmation"
                               value={this.state.password_confirmation}/>
                    </div> */}

                    
                    <button onClick={this.signIn}>Log In</button>
                </form>
                
                <div>
                      <SignUp signUp={this.props.signUp} signedIn={this.state.signedIn} signedUp={this.props.signedUp} signedIn={this.props.signedIn}/>
                    </div>
            </div>
        )
    }
}

export default SignUpLogIn