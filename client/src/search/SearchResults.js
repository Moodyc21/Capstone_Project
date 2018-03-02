import React, {Component} from 'react'
import {Route, BrowserRouter as Router, Link, Switch, Redirect} from 'react-router-dom'
import styled, {keyframes} from 'styled-components'
import Image from './Image'


const SearchResults = (props) => {

    const results = props.searchResults.map((image) => {
            return (
                

                <div>
                    <Image boardId={props.boardId} addSearchImage={props.addSearchImage} {...image} key={image.id}/>
                    <div><button onClick = {() => props.addSearchImage(props.boardId, image.link)}>(+)</button></div>
                    
                </div>
                
            )
            
        })

    return (
        <div>
        {props.searchResults.length > 0 ? <h2>Results:</h2> : null}
            <div>
                {props.searchResults.length > 0 ? results : null}
            </div>

        </div>
    )
}

export default SearchResults