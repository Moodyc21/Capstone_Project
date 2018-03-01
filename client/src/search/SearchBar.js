import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'


class SearchBar extends Component {

    state = {query: '', submittedQuery: ''}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {query} = this.state

    this.setState({submittedQuery: query})
  }
  getImages = (event) => {
    event.preventDefault()
    this.props.getImages(
           this.state.query
    )
    
}


    render() {
        const {query, submittedQuery} = this.state

        return (


            <div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input placeholder='Search' name='query' value={query} onChange={this.handleChange}/>
                    </Form.Group>
                   
                    <Form.Button onClick={this.getImages} content='Search Images' />
                </Form>
            </div>

        )
    }

}



export default SearchBar