//description, weight, rec address, invoice, logistic company dropdown
//need to pull logistic company from db
//upload image for invoice
import React, {Component} from 'react';
import Modal from './Modal.js';
import './Form.css'
import Select from 'react-select'
import { config } from './config.js';

const backend_url = config.backend_url;
const axios = require('axios');
const uuidv4 = require('uuid/v4');
const participants = config.log_participants.split(",");
const participantsPorts = config.log_participants_ports.split(",");
var hyperledger_url = config.hyperledger_url;
const options = participants.map(v => ({
  label: v,
  value: v
}));

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      description: "",
      weight: "",
      house: "",
      street: "",
      country: "",
      postal: "",
      invoiceFile: null,
      invoiceBase64: "",
      logistic: "",
      userAddress: null,
      infoMessage: "",
      trackingID: "",
      logisticCos: options,
      show: false
    }
  }

  async submitHandler (event) {
    event.preventDefault()
    try {
      const trackingID = uuidv4();

      if (!this.state.description || !this.state.weight || !this.state.house || !this.state.street 
        || !this.state.country || !this.state.postal || !this.state.invoiceBase64 || !this.state.logistic) {
          this.setState({ infoMessage: "Please fill up all the fields."});
      } else {
        var participantIndex = participants.indexOf(this.state.logistic);
        var participantPort = participantsPorts[participantIndex];
        var hyperledgerConnection = hyperledger_url +  ":" + participantPort;

        let bc_resp = await axios.post(`${hyperledgerConnection}/api/org.parceldelivery.model.CreateParcel`, {
          "$class": "org.parceldelivery.model.CreateParcel",
          "parcel": {
            "$class": "org.parceldelivery.model.Parcel",
            "trackingID": trackingID,
            "itemDescription": this.state.description,
            "parcelWeight": this.state.weight,
            "recipientAddress": {
            "$class": "org.parceldelivery.model.Address",
            "house": this.state.house,
            "street": this.state.street,
            "country": this.state.country,
            "postalCode": this.state.postal
            },
            "status": "REGISTERED",
            "location": this.state.userAddress.country,
            "invoice": this.state.invoiceBase64,
            "returnInformation": this.state.userAddress.house + this.state.userAddress.street + this.state.userAddress.country + this.state.userAddress.postal,
            "logisticCompany": `resource:org.parceldelivery.model.LogisticCompany#${this.state.logistic}`
          }
        }).catch(err => {
          this.setState( { infoMessage: "Internal server error" });
        })

        const transactionID = bc_resp.data.transactionId

        let parcel = {
          trackingID: trackingID,
          retailer: this.props.userID,
          txHistory: [transactionID]
        }

        await axios.post(`${backend_url}/parcels/input`, {
          parcel
        })

        await this.setState({ trackingID: trackingID })
        
        this.showModal()
      }

    } catch (err) {
      if (err.response) {
        this.setState({ infoMessage: err.response.data.message })
      } else {
        this.setState({ infoMessage: "Internal server error." })
      }
    }
  }

  fieldChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  base64Encode = file => {
    try{
      var reader = new FileReader();

      // read binary data
      let invoicePromise = new Promise((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject(console.error("Problem parsing invoice"));
        };

        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
      return invoicePromise
    } catch (err) {
      console.log(err)
    }
  }

  async uploadHandler (event) {
    let invoiceFile = event.target.files[0]
    await this.setState({ invoiceFile })

    this.base64Encode(this.state.invoiceFile).then((result) => {
      this.setState({
        invoiceBase64: result
      })
    })
  }

  getFileName = file =>
    (file === null) ? 'No file chosen' : file.name

  showModal = () =>
    this.setState({ show: true })

  hideModal = () =>
    this.setState({ show: false })

  async componentDidMount () {
    try {
      let resp = await axios.get(`${backend_url}/users/getAddress`, {
        params: {
          userID: this.props.userID
        }
      })

      this.setState({ userAddress: resp.data.userAddress })
     
    } catch (err) {
      console.error(err)
    }
  }

  dropdownHandler = fieldName => async (selectedOption) => {
    await this.setState({
      [fieldName] : selectedOption.value
    })
    console.log(this.state[fieldName])
  }

  render () {
    return (
      <React.Fragment>
        <Modal closeModal={this.hideModal} show={this.state.show} message={`Parcel successfully logged! Tracking ID is ${this.state.trackingID}`} />
        <form onSubmit={this.submitHandler.bind(this)} className="user-form">
          <span className="auth-error">{this.state.infoMessage}</span>

          <p>Item Description:</p>
          <input type='text'
            id='description'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Weight (kg):</p>
          <input type='text'
            id='weight'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Recipient Address (House):</p>
          <input type='text'
            id='house'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Recipient Address (Street):</p>
          <input type='text'
            id='street'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Recipient Address (Country):</p>
          <input type='text'
            id='country'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Recipient Address (Postal Code):</p>
          <input type='text'
            id='postal'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <p>Invoice:</p>
          <label htmlFor='invoiceFile' className='btn-secondary'>Choose File</label>
          <span className='file-selected'>{this.getFileName(this.state.invoiceFile)}</span>
          <input id='invoiceFile'
            type='file' accept=".jpg, .png, bmp, gif"
            onChange={this.uploadHandler.bind(this)} />

          <p>Logistic Company:</p>
          <Select
            className="basic-single transfer-dropdown"
            classNamePrefix="select"
            placeholder="Select company for transfer..."
            name="transfer"
            options={this.state.logisticCos}
            onChange={this.dropdownHandler("logistic")}
          />

          <button type='submit' className="btn-primary btn-submit">
            INPUT
          </button>
        </form>
      </React.Fragment>
    )
  }
}

export default Input;