// email, password, name, address, contact number
import React, {Component} from 'react';
import './Form.css'

const backend_url = "http://localhost:8000";
const hyperledger_url = "http://68.183.184.3:3000";
const axios = require('axios');

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      name: "",
      house: "",
      street: "",
      country: "",
      postal: "",
      contact: "",
      infoMessage: ""
    }
  }

  async submitHandler (event) {
    event.preventDefault()
    try {
      let user = {
        email: this.state.email,
        password: this.state.password
      }

      let resp = await axios.post(`${backend_url}/users`, { 
        user 
      })

      await axios.post(`${hyperledger_url}/api/org.parceldelivery.model.Retailer/`, {
        "$class": "org.parceldelivery.model.Retailer",
        "email": this.state.email,
        "name": this.state.name,
        "address": {
          "$class": "org.parceldelivery.model.Address",
          "house": this.state.house,
          "street": this.state.street,
          "country": this.state.country,
          "postalCode": this.state.postal
        },
        "contactNum": this.state.contact
      })

      this.props.login(this.state.email)
      this.props.redirect("input")
    } catch (err) {
      if (err.response) {
        this.setState({ infoMessage: err.response.data.message })
      } else {
        this.setState({ infoMessage: "Internal server error" })
      }
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
          <span className="auth-error">{this.state.infoMessage}</span>          
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

          <p>House:</p>
          <input type='text'
            id='house'
            onChange={this.fieldChangeHandler}
            className='input-field' />
          
          <p>Street:</p>
          <input type='text'
            id='street'
            onChange={this.fieldChangeHandler}
            className='input-field' />
          
          <p>Country:</p>
          <input type='text'
            id='country'
            onChange={this.fieldChangeHandler}
            className='input-field' />
          
          <p>Postal Code:</p>
          <input type='text'
            id='postal'
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