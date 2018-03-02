import React from 'react'
import styled from 'styled-components'



const ImageWrapper = styled.div`
    img {
      border: 3px solid #999;
      width: 180px;
      height: 180px;
      margin: 10px;
      float: left;
    }

`


const Image = (props) => {
    // const addSearchImage = () => {
    //     // const boardId = props.match.params.id
    //     props.addSearchImage(props.boardId, props.key)
    // }
  
    return (
        
                <div>
                    {/* <div><button onClick={addSearchImage}>(+)</button></div> */}
        
            <ImageWrapper><img src={props.link} alt="image"/></ImageWrapper>  

            </div>
    
    )
}

export default Image