//description, weight, rec address, invoice, logistic company dropdown
//need to pull logistic company from db
//upload image for invoice
import React, {Component} from 'react';
import './Form.css'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: "",
      weight: "",
      address: "",
      invoice: "",
      logistic: ""
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
          <p>Item Description:</p>
          <input type='text'
            id='description'
            onChange={this.fieldChangeHandler}
            className='input-field' />
          
          <p>Weight:</p>
          <input type='text'
            id='weight'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Recipient Address:</p>
          <input type='text'
            id='address'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Invoice:</p>
          <input type='text'
            id='invoice'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Logistic Company:</p>
          <input type='text'
            id='logistic'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <button type='submit' className="btn-primary btn-submit">
            INPUT
          </button>
        </form>
      </React.Fragment>
    )
  }
}

export default Input;