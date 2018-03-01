import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class SignUpSignInForm extends Component {
  state = {email: '', password: '', password_confirmation: '', image: '', submittedEmail: '', submittedPassword: '', submittedPasswordConfirm: '', submittedImage: ''}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {email, password, password_confirmation, image} = this.state

    this.setState({submittedEmail: email, submittedPassword: password, submittedPasswordConfirm: password_confirmation, submittedImage: image})
  }
  signUp = (event) => {
    event.preventDefault()
    this.props.signUp(
        this.state.email,
        this.state.password,
        this.state.password_confirmation,
        this.state.image
    )
    
    
}

  render() {
    const {email, password, password_confirmation, image, submittedEmail, submittedPassword, submittedPasswordConfirm, submittedImage} = this.state

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            {/* <Form.Input placeholder='Name' name='name' value={name} onChange={this.handleChange} /> */}
            <Form.Input placeholder='Email' name='email' value={email} onChange={this.handleChange} />
            <Form.Input placeholder='password' name='password' value={password} onChange={this.handleChange} />
            <Form.Input placeholder='password confirmation' name='password_confirmation' value={password_confirmation} onChange={this.handleChange} />
            <Form.Input placeholder='image_url' name='image' value={image} onChange={this.handleChange} />
            <Form.Button onClick={this.signUp} content='Submit' />
          </Form.Group>
        </Form>
        {/* <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, email, password, password_confirmation }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedName, submittedEmail, submittedPassword, submittedPasswordConfirm }, null, 2)}</pre> */}
      </div>
    )
  }
}

export default SignUpSignInForm
