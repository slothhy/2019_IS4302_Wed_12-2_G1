// email, password, name, address, contact number
import React, {Component} from 'react';
import './Form.css'

const backend_url = "http://localhost:8000";
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
        password: this.state.password,
        name: this.state.name,
        house: this.state.house,
        street: this.state.street,
        country: this.state.country,
        postal: this.state.postal,
        contact: this.state.contact,
      }

      let resp = await axios.post(`${backend_url}/users`, { 
        user 
      })

      // retailer don't require blockchain
      // await axios.post(`${hyperledger_url}/api/org.parceldelivery.model.Retailer/`, {
      //   "$class": "org.parceldelivery.model.Retailer",
      //   "email": this.state.email,
      //   "name": this.state.name,
      //   "address": {
      //     "$class": "org.parceldelivery.model.Address",
      //     "house": this.state.house,
      //     "street": this.state.street,
      //     "country": this.state.country,
      //     "postalCode": this.state.postal
      //   },
      //   "contactNum": this.state.contact
      // })

      this.props.login(this.state.email, resp.data.role)
    } catch (err) {
      this.setState({ infoMessage: err.response.data.message })
      console.error(err)
    }
  }

  fieldChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleEmailChange = event => {
    this.setState( { email: event.target.value }, () => {
      this.validateEmail();
    });
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value }, () => {
      this.validatePassword();
    });
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value }, () => {
      this.validateName();
    });
  }

  handleHouseChange = event => {
    this.setState({ house: event.target.value }, () => {
      this.validateHouse();
    });
  }

  handleStreetChange = event => {
    this.setState({ street: event.target.value }, () => {
      this.validateStreet();
    });
  }

  handleCountryChange = event => {
    this.setState({ country: event.target.value }, () => {
      this.validateCountry();
    });
  }

  handlePostalChange = event => {
    this.setState({ postal: event.target.value }, () => {
      this.validatePostal();
    });
  }

  handleContactChange = event => {
    this.setState({ contact: event.target.value }, () => {
      this.validateContact();
    });
  }

  validateEmail = () => {
    const { email } = this.state;
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var errorMessage = '';
    if (!email.match(regex)) {
      errorMessage = 'Please enter a valid email';
    } else {
      errorMessage = '';
    }
    this.setState({
      infoMessage: errorMessage
    });
  }

  validatePassword = () => {
    const { password } = this.state;
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    var errorMessage = '';
    if (!password.match(regex)) {
      errorMessage = 'Password should contain at least 1 lowercase character, 1 uppercase character, 1 numeric character, and 1 special character';
    } else {
      errorMessage = '';
    }
    this.setState({
      infoMessage: errorMessage
    });
  }

  validateName = () => {
    const { name } = this.state;
    var regex = /^[a-zA-Z\s]+$/
    var errorMessage = '';
    if (!name.match(regex)) {
      errorMessage = 'Name should only contain letters';
    } else {
      errorMessage = '';
    }
    this.setState({
      infoMessage: errorMessage
    });
  }

  validateHouse = () => {
    const { house } = this.state;
    var regex = /^[a-zA-Z0-9\s]+$/
    var errorMessage = '';
    if (!house.match(regex)) {
      errorMessage = 'House should only contain letters and numbers';
    } else {
      errorMessage = '';
    }
    this.setState({
      infoMessage: errorMessage
    });
  }

  validateStreet = () => {
    const { street } = this.state;
    var regex = /^[a-zA-Z0-9\s]+$/
    var errorMessage = '';
    if (!street.match(regex)) {
      errorMessage = 'Street should only contain letters and numbers';
    } else {
      errorMessage = '';
    }
    this.setState({
      infoMessage: errorMessage
    });
  }

  validateCountry = () => {
    const { country } = this.state;
    var regex = /^[a-zA-Z\s]+$/
    var errorMessage = '';
    if (!country.match(regex)) {
      errorMessage = 'Country name should contain only letters';
    } else {
      errorMessage = '';
    }
    this.setState({
      infoMessage: errorMessage
    });
  }

  validatePostal = () => {
    const { postal } = this.state;
    var regex = /^[a-zA-Z0-9]+$/
    var errorMessage = '';
    if (!postal.match(regex)) {
      errorMessage = 'Postal code should contain only letters and numbers';
    } else {
      errorMessage = '';
    }
    this.setState({
      infoMessage: errorMessage
    });
  }

  validateContact = () => {
    const { contact } = this.state;
    var regex = /^[0-9]+$/
    var errorMessage = '';
    if (!contact.match(regex)) {
      errorMessage = 'Contact number should contain only numbers';
    } else {
      errorMessage = '';
    }
    this.setState({
      infoMessage: errorMessage
    });
  }

  render () {
    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler.bind(this)} className="user-form">
          <span className="auth-error">{this.state.infoMessage}</span>          
          <p>Email:</p>
          <input type='text'
            id='email'
            onChange={this.handleEmailChange}
            className='input-field' />

          <p>Password:</p>
          <input type='password'
            id='password'
            onChange={this.handlePasswordChange}
            className='input-field' />

          <p>Name:</p>
          <input type='text'
            id='name'
            onChange={this.handleNameChange}
            className='input-field' />

          <p>House:</p>
          <input type='text'
            id='house'
            onChange={this.handleHouseChange}
            className='input-field' />
          
          <p>Street:</p>
          <input type='text'
            id='street'
            onChange={this.handleStreetChange}
            className='input-field' />
          
          <p>Country:</p>
          <input type='text'
            id='country'
            onChange={this.handleCountryChange}
            className='input-field' />
          
          <p>Postal Code:</p>
          <input type='text'
            id='postal'
            onChange={this.handlePostalChange}
            className='input-field' />

          <p>Contact:</p>
          <input type='text'
            id='contact'
            onChange={this.handleContactChange}
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