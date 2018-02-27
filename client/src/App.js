import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import SignUpLogIn from './forms/SignUpLogIn'
import axios from 'axios'
import BoardsList from "./boards/BoardsList";
import {clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn} from "./util/SessionHeaderUtil";
import SignUp from './forms/SignUp.js'

class App extends Component {

    state = {
        current_user: '',
        signedIn: false,
        boards: [],
        image: ''
        
    }

    async componentWillMount() {
            try {
                const signedIn = userIsLoggedIn()
        
                let boards = []
                let current_user = []
                if (signedIn) {
                    setAxiosDefaults()
                    boards = await this.getBoards()
                    current_user = await this.getCurrentUser()
                    console.log("this is the currentUser", current_user)
                }
        
                this.setState({
                    boards,
                    signedIn,
                    current_user
                })
            } catch(error) {
                console.log(error)
            }
        }

        getCurrentUser = async (userId) => {
            try {
                const response = await axios.get(`/users/${userId}`)
                console.log("This is a res", response)
                return response.data
            } catch (error) {
                console.log("Did not get", error)
                return []
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

createBoard = async (name, year, completed) => {
    try{ 
        const payload = {
            name: name,
            year: year,
            completed: completed
        }
        await axios.post('/boards', payload)
        const boards = await this.getBoards()
        this.setState({boards})
    } catch (error) {
        console.log(error)
    }
}

deleteBoard = async (boardId) => {
    try {
        await axios.delete(`/boards/${boardId}`)

        const boards = await this.getBoards()
        this.setState({boards})
    } catch (error) {
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
                getBoards={this.getBoards}
                createBoard={this.createBoard}
                deleteBoard={this.deleteBoard}/>
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
                    <div>
                    {this.state.signedIn ? <img src={this.state.current_user.image} alt="User Profile Pic"/> : null}
                    </div>
                    
                </div>
            </Router>
        )
    }
}

export default App