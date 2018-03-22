import React, {Component} from 'react'
import SignUp from '../forms/SignUp.js'
import { Input, Icon } from 'semantic-ui-react'
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components'

const Formdiv = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 200px 0;


`

const Formdivtwo = styled.div`
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    


`
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
    
            
            <Formdiv>
                <Formdivtwo>
                <form>
                    <div>
                        {/* <label htmlFor="email">E-mail: </label> */}
                        <Input onChange={this.handleChange} placeholder='e-mail' type="text" name="email" value={this.state.email}/>
                    </div>
                    <div>
                        {/* <label htmlFor="password">Password: </label> */}
                        <Input onChange={this.handleChange} placeholder='password' type="password" name="password" value={this.state.password}/>
                    </div>
                    {/* <div>
                        <label htmlFor="password_confirmation">Confirm Password: </label>
                        <input onChange={this.handleChange} type="password" name="password_confirmation"
                               value={this.state.password_confirmation}/>
                    </div> */}

                    
                    <RaisedButton onClick={this.signIn}>Log In</RaisedButton>
                </form>
                </Formdivtwo>
                <div>
                      <SignUp signUp={this.props.signUp} signedIn={this.state.signedIn} signedUp={this.props.signedUp} signedIn={this.props.signedIn}/>
                    </div>
            </Formdiv>
            
        )
    }
}

export default SignUpLogIn