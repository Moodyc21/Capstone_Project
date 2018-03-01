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
  
    return (
        
                
        
            <ImageWrapper><img src={props.link} alt="image"/></ImageWrapper>  
    
    )
}

export default Image