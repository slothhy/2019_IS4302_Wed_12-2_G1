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
      infoMessage: "",
      touched: {
        email: false,
        password: false,
        name: false,
        house: false,
        street: false,
        country: false,
        postal: false,
        contact: false
      }
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

  /**
  handleEmailChange = event => {
    this.setState( { email: event.target.value }, () => {
      this.validateEmail();
    });
  }
  */

  handlePasswordChange = event => {
    this.setState({ password: event.target.value }, () => {
      this.validatePassword();
    });
  }

  /**
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
*/
  validate() {
    return {
      email: this.validateEmail(),
      password: this.validatePassword(),
      name: this.validateName(),
      house: this.validateHouse(),
      street: this.validateStreet(),
      country: this.validateCountry(),
      postal: this.validatePostal(),
      contact: this.validateContact()
    }
  }
  validateEmail = () => {
    const { email } = this.state;
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //var errorMessage = '';
    if (email === "" || !email.match(regex)) {
      //errorMessage = 'Please enter a valid email';
      return true;
    } else {
      //errorMessage = '';
      return false;
    }
    /**
    this.setState({
      infoMessage: errorMessage
    });
    */
  }

  validatePassword = () => {
    const { password } = this.state;
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    return (password === "" ||!password.match(regex));
  }

  validateName = () => {
    const { name } = this.state;
    var regex = /^[a-zA-Z\s]+$/
    return (name === "" || !name.match(regex));
  }

  validateHouse = () => {
    const { house } = this.state;
    var regex = /^[a-zA-Z0-9\s]+$/
    return (house === "" || !house.match(regex));
  }

  validateStreet = () => {
    const { street } = this.state;
    var regex = /^[a-zA-Z0-9\s]+$/
    return (street === "" || !street.match(regex));
  }

  validateCountry = () => {
    const { country } = this.state;
    var regex = /^[a-zA-Z\s]+$/
    return (country === "" || !country.match(regex));
  }

  validatePostal = () => {
    const { postal } = this.state;
    var regex = /^[a-zA-Z0-9]+$/
    return (postal === "" || !postal.match(regex));
  }

  validateContact = () => {
    const { contact } = this.state;
    var regex = /^[0-9]+$/
    return (contact === "" || !contact.match(regex));
  }

  handleBlur = id => event => {
    this.setState({
      touched: { ...this.state.touched, [id]: true }
    });
  }

  render () {
    const errors = this.validate();
    const shouldMarkError = (id) => {
      const hasError = errors[id];
      const shouldShow = this.state.touched[id];

      return hasError ? shouldShow : false;
    };

    const isEnabled = !Object.keys(errors).some(id => errors[id]);

    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler.bind(this)} className="user-form">
          <span className="auth-error">{this.state.infoMessage}</span>          
          <p>Email:</p>
          <input type='text'
            id='email'
            onChange={this.fieldChangeHandler}
            onBlur={this.handleBlur('email')}
            className={shouldMarkError('email') ? 'error' : 'input-field'} />

          <p>Password:</p>
          <input type='password'
            id='password'
            onChange={this.fieldChangeHandler}
            onBlur={this.handleBlur('password')}
            className={shouldMarkError('password') ? 'error' : 'input-field'} />

          <p>Name:</p>
          <input type='text'
            id='name'
            onChange={this.fieldChangeHandler}
            onBlur={this.handleBlur('name')}
            className={shouldMarkError('name') ? 'error' : 'input-field'} />

          <p>House:</p>
          <input type='text'
            id='house'
            onChange={this.fieldChangeHandler}
            onBlur={this.handleBlur('house')}
            className={shouldMarkError('house') ? 'error' : 'input-field'} />
          
          <p>Street:</p>
          <input type='text'
            id='street'
            onChange={this.fieldChangeHandler}
            onBlur={this.handleBlur('street')}
            className={shouldMarkError('street') ? 'error' : 'input-field'} />
          
          <p>Country:</p>
          <input type='text'
            id='country'
            onChange={this.fieldChangeHandler}
            onBlur={this.handleBlur('country')}
            className={shouldMarkError('country') ? 'error' : 'input-field'} />
          
          <p>Postal Code:</p>
          <input type='text'
            id='postal'
            onChange={this.fieldChangeHandler}
            onBlur={this.handleBlur('postal')}
            className={shouldMarkError('postal') ? 'error' : 'input-field'} />

          <p>Contact:</p>
          <input type='text'
            id='contact'
            onChange={this.fieldChangeHandler}
            onBlur={this.handleBlur('contact')}
            className={shouldMarkError('contact') ? 'error' : 'input-field'} />

          <button disabled={!isEnabled} type='submit' className="btn-primary btn-submit">
            REGISTER
          </button>
        </form>
      </React.Fragment>
    )
  }
}
  
export default Register;