import React, { Component } from 'react';
import Navbar from './Navbar.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      logged_in: true
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

  render() {
    return (
      <div className="page">
        <div className="nav-bar">
          <Navbar isUser={this.state.logged_in}/>
        </div>
        <form onSubmit={this.submitHandler.bind(this)} className="register-form">
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

          <button type='submit' className="btn-primary btn-submit">
            REGISTER
          </button>
        </form>
      </div>
    );
  }
}

export default App;
