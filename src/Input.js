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
      invoiceFile: null,
      invoiceBase64: "",
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

  base64Encode = file => {
    try{
      // read binary data
      var reader = new FileReader();
      // convert binary data to base64 encoded string
      reader.onloadend = function() {
        console.log('RESULT', reader.result)
      }
      reader.readAsDataURL(file);
    } catch (err) {
      console.log(err)
    }
  }

  async uploadHandler (event) {
    let invoiceFile = event.target.files[0]
    await this.setState({ invoiceFile })

    let convertedFile = this.base64Encode(this.state.invoiceFile)

    this.setState({
      invoiceBase64: convertedFile
    })
  }

  getFileName = file => 
    (file === null) ? 'No file chosen' : file.name


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
          <label htmlFor='invoiceFile' className='btn-secondary'>Choose File</label>
          <span className='file-selected'>{this.getFileName(this.state.invoiceFile)}</span>
          <input id='invoiceFile' 
            type='file' 
            onChange={this.uploadHandler.bind(this)} />

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