// email, password, name, address, contact number
import React, {Component} from 'react';
import './Form.css'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      name: "",
      address: "",
      contact: ""
    }
  }

  async submitHandler (event) {
    event.preventDefault()
    try {

    } catch (err) {
      console.error(err)
    }
  }

  fieldChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render () {
    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler.bind(this)} className="user-form">
          <p>Email:</p>
          <input type='text'
            id='email'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Password:</p>
          <input type='text'
            id='password'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Name:</p>
          <input type='text'
            id='name'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Address:</p>
          <input type='text'
            id='address'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Contact:</p>
          <input type='text'
            id='contact'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <button type='submit' className="btn-primary btn-submit">
            REGISTER
          </button>
        </form>
      </React.Fragment>
    )
  }
}
  
export default Register;