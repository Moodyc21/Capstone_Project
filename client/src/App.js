import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'
import SignUpLogIn from './components/SignUpLogIn'
import axios from 'axios'
import BoardsList from "./components/BoardsList";

class App extends Component {

    state = {
        signedIn: false,
        boards: []
    }

    async componentWillMount() {
        try {
            let boards = []
            if (this.state.signedIn) {
                boards = await this.getBoards()
            }

            this.setState({
                boards
            })
        } catch (error) {
            console.log(error);
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
        ...
    }

    signIn = async (email, password) => {
        try {
            const payload = {
                email,
                password
            }
            await axios.post('/auth/sign_in', payload)

            const boards = await this.getBoards()

            this.setState({
                signedIn: true,
                boards
            })

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
                boards={this.state.boards}/>
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
                </div>
            </Router>
        )
    }
}

export default App