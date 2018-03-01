import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Link, Switch, Redirect} from 'react-router-dom'
import SignUpLogIn from './forms/SignUpLogIn'
import axios from 'axios'
import BoardsList from "./boards/BoardsList";
import {clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn} from "./util/SessionHeaderUtil";
import SignUp from './forms/SignUp.js'
import styled from 'styled-components'

class App extends Component {

    state = {
        current_user: [],
        signedIn: false,
        boards: [],
        addedImage: false,
        signedUp: false

    }

    async componentWillMount() {
        try {
            const signedIn = userIsLoggedIn()

            let boards = []
            let current_user = []
            if (signedIn === true) {
                setAxiosDefaults()
                boards = await this.getBoards()
                current_user = await this.getCurrentUser()
                console.log("this is the currentUser", current_user)
            }

            this.setState({boards, signedIn, current_user})
        } catch (error) {
            console.log(error)
        }
    }

    getCurrentUser = async(userId) => {
        try {
            const response = await axios.get(`/users/${userId}`)
            console.log("This is a res", response)
            return response.data
        } catch (error) {
            console.log("Did not get", error)
            return []
        }
    }

    getBoards = async() => {
        try {
            const response = await axios.get('/boards')
            return response.data
        } catch (error) {
            console.log(error)
            return []
        }
    }

    signUp = async(email, password, password_confirmation, image) => {
        try {
            const payload = {
                email: email,
                password: password,
                password_confirmation: password_confirmation,
                image: image
            }
            const response = await axios.post('/auth', payload)
            saveAuthTokens(response.headers)
            console.log("This this state", response)


            this.setState({current_user: response.data.data, signedUp: true, addedImage: true})
            alert('Thanks for signing up!', this.state.current_user.email)

            console.log('current:', this.state.current_user)
            this.getCurrentUser()
            

        } catch (error) {
            console.log(error)
        }
    }

    addImageSignup = async () => {

        let image_url = prompt("Please enter an Image URL.")
        const user = await this.getCurrentUser()
        const imageUpdate = await axios.patch(`/users/${user.id}`, {
            image: image_url})

            console.log('ImageUpdateRes:', imageUpdate)

            this.setState({current_user: imageUpdate, addedImage: false, signedUp: true, signedIn: true})
            console.log("Add image current:", this.state.current_user)
    }

    signIn = async (email, password) => {
        try {
            const payload = {
                email,
                password,
            
            }

            const response = await axios.post('/auth/sign_in', payload)
            saveAuthTokens(response.headers)
            console.log("Res.data", response)

            const boards = await this.getBoards()

            this.setState({signedIn: true, boards, current_user: response.data.data})

        } catch (error) {
            console.log(error)
        }
    }

    signOut = async(event) => {
        try {
            event.preventDefault()

            await axios.delete('/auth/sign_out')

            clearAuthTokens();

            this.setState({signedIn: false, signedUp: false, current_user: [], image: ''})
            console.log('This is the state signout', this.state)


        } catch (error) {
            console.log(error)
        }
    }

    createBoard = async(name, year, completed) => {
        try {
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

    deleteBoard = async(boardId) => {
        try {
            await axios.delete(`/boards/${boardId}`)

            const boards = await this.getBoards()
            this.setState({boards})
        } catch (error) {
            console.log(error)
        }
    }

    render() {

        const SignUpLogInComponent = () => (<SignUpLogIn signUp={this.signUp} signIn={this.signIn} signedUp={this.state.signedUp} signedIn={this.state.signedIn}/>)

        const BoardsComponent = () => (<BoardsList
            boards={this.state.boards}
            getBoards={this.getBoards}
            createBoard={this.createBoard}
            deleteBoard={this.deleteBoard}/>)
        const SignUpComponent = () => (<SignUp signUp={this.signUp} signedUp={this.state.signedUp}/>)

        return (
            <Router>
                <div>
                   
                    {this.state.addedImage ? <SignUpImage><button onClick={this.addImageSignup}>Add Image<br/>(+)</button></SignUpImage> : null}
                    
                    <Imagewrapper>
                        {this.state.signedIn ? <img src={this.state.current_user.image} alt="User Profile Pic"/> : null}
                    </Imagewrapper>
                    <Switch>
                        <Route exact path="/signUp" render={SignUpLogInComponent}/>
                        <Route exact path="/boards" render={BoardsComponent}/>
                    </Switch>

                    {/* If user is signed in, redirect to their posts. */}
                    <div>
                    {this.state.signedIn ? null : <Redirect to="/signUp"/>}
                    </div>
                    <div>
                    {this.state.signedUp ? null : <Redirect to="/signUp"/>}
                    </div>
                    <div>
                        {this.state.signedIn ? <button onClick={this.signOut}>Sign Out</button> : null}
                    </div>
                    <div>
                        {this.state.signedIn ? <Link to={`/boards`}><button>Vision Boards</button></Link> : null}
                    </div>

                </div>
            </Router>
        )
    }
}

export default App

const Imagewrapper = styled.div`
    img {
        border: 2px solid grey;
        height: 100px;
        width: 100px;
        border-radius: 49%;
    }
    
`
const SignUpImage = styled.div`

        border: 2px solid grey;
        height: 100px;
        width: 100px;
        border-radius: 49%;

    button {
        margin: 25px 25px;
    }


`