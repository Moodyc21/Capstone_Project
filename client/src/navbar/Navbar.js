import React, { Component } from 'react'
import styled from 'styled-components'

const NavWrap = styled.div`
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid lightgrey;
    background: linear-gradient(grey, lightgrey);
    background-color: lightgrey;
    img {
        color: grey;
        height: 50px;
        width: 50px;
    }
    h2 {
        color: white;
        font-size: 30px;
        margin: 7px 0;
        -webkit-text-stroke: 1px grey;
    }
    




`

class Navbar extends Component {

    render() {

        return(

            <NavWrap>
                <img src="https://i.imgur.com/HZojS1N.png" alt="dreamWeaver"/><span></span><h2>Weaver</h2>
            </NavWrap>

        )
    }
}

export default Navbar