import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Link, Switch, Redirect} from 'react-router-dom'
import SignUpLogIn from './forms/SignUpLogIn'
import axios from 'axios'
import BoardsList from "./boards/BoardsList";
import BoardShow from './boards/BoardShow'
import SearchBar from './search/SearchBar'
import Navbar from './navbar/Navbar.js'
import {clearAuthTokens, saveAuthTokens, setAxiosDefaults, userIsLoggedIn} from "./util/SessionHeaderUtil";
import SignUp from './forms/SignUp.js'
import styled from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { Button, Icon } from 'semantic-ui-react';
import swal from 'sweetalert';



class App extends Component {

    state = {
        current_user: [],
        signedIn: false,
        boards: [],
        addedImage: false,
        signedUp: false,
        searchResults: [],
        images: []

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
            this.setState({current_user: response.data.data})
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

    getOneBoard = async(boardId) => {
        try {
            const response = await axios.get(`/boards/${boardId}`)
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
            swal('Thanks for signing up!', this.state.current_user.email)

            console.log('current:', this.state.current_user)
            this.getCurrentUser()
            

        } catch (error) {
            console.log(error)
        }
    }

    addImageSignup = async () => {

        let image = prompt("Please enter an Image URL.")
        const user = await this.getCurrentUser()
        const imageUpdate = await axios.patch(`/users/${user.id}`, {
            image})
           await this.getCurrentUser()

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

    getImages = async(query) => {
        try {
            const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_CUSTOM_SEARCH}&fields=items(link)&cx=001195195440322982552:j1vwe7kfs4g&q=${query}&searchType=image`)
            console.log("My image search res:", response.data.items)
            this.setState({searchResults: response.data.items}) 
        } catch (error) {
            console.log(error)
            return []
        }
    }

    addSearchImage = async(boardId, image) => {
        try {
            const payload = {
                board_id: boardId,
                link: image
            }
            const response = await axios.post(`/boards/${boardId}/images`, payload)
            console.log("Did I add image to db:", response)
            console.log("Image board ID:", boardId)
            
        } catch (error) {
            console.log(error)
            return []
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

        const BoardShowComponent = (props) => (<BoardShow images={this.state.images} getOneBoard={this.getOneBoard} getImages={this.getImages} searchResults={this.state.searchResults} {...props} />)

        const SearchComponent = (props) => (<SearchBar getImages={this.getImages} {...props}/>)
        

        return (
            <div>
                <Navbar/>
            <Router>
        <Background>
            
                <HomeWrapper>
              <MuiThemeProvider>
                
                    {this.state.addedImage ? <SignUpImage><button onClick={this.addImageSignup}>Img<br/>+</button></SignUpImage> : null}
                    
                    <Imagewrapper>
                        {this.state.signedIn ? <img src={this.state.current_user.image} alt="User Profile Pic"/> : null}
                    </Imagewrapper>
                    <Switch>
                        <Route exact path="/signUp" render={SignUpLogInComponent}/>
                        <Route exact path="/boards" render={BoardsComponent}/>
                        <Route path="/boards/:id" render={BoardShowComponent}/>
                    </Switch>

                    
                    <div>
                    {this.state.signedIn ? null : <Redirect to="/signUp"/>}
                    </div>
                    <div>
                    {this.state.signedUp ? null : <Redirect to="/signUp"/>}
                    </div>
                    <div>
                        {this.state.signedIn ? <Buttondiv><RaisedButton onClick={this.signOut}>Sign Out</RaisedButton></Buttondiv> : null}
                    </div>
                    <div>
                        {this.state.signedIn ? <Link to={`/boards`}><Buttondiv><RaisedButton>Vision Boards</RaisedButton></Buttondiv></Link> : null}
                    </div>

            </MuiThemeProvider>

            </HomeWrapper>
                
            
              </Background>
              </Router>

              </div>
            
            
        )
    }
}

export default App

const Background = styled.div`
        background-position: center;
        height: 80vh;
        width: 100vw;
        background-image: url('https://i.imgur.com/GL50pfJ.png');
        background-repeat: no-repeat;

`

const HomeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin: 100px;

`

const Imagewrapper = styled.div`
    margin: 30px 0;
    img {
        border: 2px solid grey;
        height: 100px;
        width: 100px;
        border-radius: 49%;
    }
    
`
const SignUpImage = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 2px solid grey;
        height: 100px;
        width: 100px;
        border-radius: 49%;
        :hover{
            border: 2px solid goldenrod;
        }

    button {
        margin: 35px 35px;
        border: none
        
    }
`

const Buttondiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px;
    button {
        
    }

`