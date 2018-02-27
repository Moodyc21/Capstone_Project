import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import SignUpLogIn from './forms/SignUpLogIn'
import axios from 'axios'
import BoardsList from "./components/BoardsList";
import {clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn} from "./util/SessionHeaderUtil";
import SignUp from './forms/SignUp.js'

class App extends Component {

    state = {
        signedIn: false,
        boards: [],
        
    }

    async componentWillMount() {
            try {
                const signedIn = userIsLoggedIn()
        
                let boards = []
                if (signedIn) {
                    setAxiosDefaults()
                    boards = await this.getBoards()
                }
        
                this.setState({
                    boards,
                    signedIn
                })
            } catch(error) {
                console.log(error)
            }
        }

    getBoards = async () => {
        try {
            const response = await axios.get('/boards')
            return response.data
        } catch (error) {
            console.log(error)
            return []
        }
    }

    signUp = async (email, password, password_confirmation) => {
      try {
          const payload = {
              email: email,
              password: password,
              password_confirmation: password_confirmation
          }
          const response = await axios.post('/auth', payload)
          saveAuthTokens(response.headers)
  
          this.setState({
              signedIn: true,
          })
  
      } catch (error) {
          console.log(error)
      }
  }
  
  signIn = async (email, password) => {
      try {
          const payload = {
              email,
              password
          }
          const response = await axios.post('/auth/sign_in', payload)
          saveAuthTokens(response.headers)
          
  
          const boards = await this.getBoards()
  
          this.setState({
              signedIn: true,
              boards
          })
  
      } catch (error) {
          console.log(error)
      }
  }

  signOut = async (event) => {
    try {
        event.preventDefault()
        
        await axios.delete('/auth/sign_out')

        clearAuthTokens();

        this.setState({signedIn: false})
    } catch(error) {
        console.log(error)
    }
}


    render() {

        const SignUpLogInComponent = () => (
            <SignUpLogIn
                signUp={this.signUp}
                signIn={this.signIn}/>
        )

        const BoardsComponent = () => (
            <BoardsList
                boards={this.state.boards}
                getBoards={this.getBoards}/>
        )
        const SignUpComponent = () => (
          <SignUp signUp={this.signUp} />
        )

        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/signUp" render={SignUpLogInComponent}/>
                        <Route exact path="/boards" render={BoardsComponent}/>
                    </Switch>

                    {/* If user is signed in, redirect to their posts. */}
                    {this.state.signedIn ? <Redirect to="/boards"/> : <Redirect to="/signUp"/>}
                    <div>
                    {this.state.signedIn ? <button onClick={this.signOut}>Sign Out</button> : null}
                    </div>
                    
                </div>
            </Router>
        )
    }
}

export default App