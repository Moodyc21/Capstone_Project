import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class NewBoardForm extends Component {
    state = {name: '', year: '', completed: '', submittedName: '', submittedYear: '', submittedCompleted: ''}

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {name, year, completed} = this.state

    this.setState({submittedName: name, submittedYear: year, submittedCompleted: completed})
  }
  createBoard = (event) => {
    event.preventDefault()
    this.props.createBoard(
        this.state.name,
        this.state.year,
        this.state.completed   
    )
    this.props.closeForm()
}


    render() {
        const {name, year, completed, submittedName, submittedYear, submittedCompleted} = this.state

        return (


            <div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input placeholder='name' name='name' value={name} onChange={this.handleChange}/>
                        <Form.Input placeholder='year' name='year' value={year} onChange={this.handleChange}/>
                    </Form.Group>
                    {/* <Form.Group grouped>
                        <Form.Input label='True' name='completed' type='radio' name='True' value={completed} onChange={this.handleChange}/>
                        <Form.Input label='False' name='completed' type='radio' name='False' value={completed} onChange={this.handleChange}/>
                    </Form.Group> */}
                    <Form.Button onClick={this.createBoard} content='Submit' />
                </Form>
            </div>

        )
    }

}

export default NewBoardForm