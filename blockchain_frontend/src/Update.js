// modify hardcoded bits that use fedex
// redirect on success to welcome
import React, {Component} from 'react';
import Modal from './Modal.js';
import './Form.css'
import Select from 'react-select'
import { config } from './config.js';

const backend_url = "http://localhost:8000";
const hyperledger_url = "http://68.183.184.3:9000";
const axios = require('axios');
const participants = config.logParticipants.split(",");
const options = participants.map(v => ({
  label: v,
  value: v
}));

class Update extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      data: [],
      parcels: [],
      parcel: null,
      status: "",
      location: "",
      conditionFile: "",
      conditionOfParcel: "",
      parcelTransfer: "",
      logisticCos: options
    }
  }

  async submitHandler (event) {
    event.preventDefault()
    
    if (!this.state.conditionOfParcel || !this.state.status) {
        this.setState({ infoMessage: "Please fill up all the fields."});
    } else {
      try {
        let changedOptions = ['conditionOfParcel', 'status', 'location', 'parcelTransfer']
        let reqData = {
          logisticCompany: "resource:org.parceldelivery.model.LogisticCompany#" + this.props.userID,
          conditionOfParcel: "",
          status: "",
          hasChangedLC: false,
          location: ""
        }
        changedOptions.map(fieldName => {
          if (fieldName === 'parcelTransfer') {
            if (this.state[fieldName] && this.state[fieldName] !== this.props.userID) {
              reqData.hasChangedLC = true
              reqData.logisticCompany = `resource:org.parceldelivery.model.LogisticCompany#${this.state[fieldName]}`
            }
          } else {
            // for parcel status and location
            if (this.state[fieldName]) {
              // value changed
              reqData[fieldName] = this.state[fieldName]
            } else {
              // no value input
              reqData[fieldName] = this.state.parcel[fieldName]
            }
          }
        })

        await axios.post(`${hyperledger_url}/api/org.parceldelivery.model.UpdateParcel`, {
          "$class": "org.parceldelivery.model.UpdateParcel",
          "parcel": `resource:org.parceldelivery.model.Parcel#${this.state.parcel.trackingID}`,
          "logisticCompany": reqData.logisticCompany,
          "conditionOfParcel": reqData.conditionOfParcel,
          "status": reqData.status,
          "hasChangedLC": reqData.hasChangedLC,
          "location": reqData.location
        }).then(response => {
          axios.post(`${backend_url}/parcels/appendParcelTx`, {
            trackingID: this.state.parcel.trackingID, transactionID: response.data.transactionId
          })
        })

        this.showModal()

      } catch (err) {
        console.error(err)
      }
    }
  }

  fieldChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log(this.state)
  }

  base64Encode = file => {
    try{
      var reader = new FileReader();

      // read binary data
      let conditionPromise = new Promise((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject(console.error("Problem parsing condition"));
        };

        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
      return conditionPromise
    } catch (err) {
      console.log(err)
    }
  }

  async uploadHandler (event) {
    let conditionFile = event.target.files[0]
    await this.setState({ conditionFile })

    this.base64Encode(this.state.conditionFile).then((result) => {
      this.setState({
        conditionOfParcel: result
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
      console.log(this.props.userID);
      let resp = await axios.get(`${hyperledger_url}/api/org.parceldelivery.model.Parcel`, {
        params: {
        "filter" : {"where": {"logisticCompany": "resource:org.parceldelivery.model.LogisticCompany#" + this.props.userID}}
        }
      })
      
      let parcelIDs = resp.data.map(parcel => {
        let parcelOption = {
          value: parcel.trackingID,
          label: parcel.trackingID
        }
        return parcelOption
      })
      this.setState({ 
        data: resp.data, 
        parcels: parcelIDs 
      })
    } catch (err) {
      console.error(err)
    }
  } 

  displayParcel = selectedOption => {
    let chosenParcel = this.state.data.find(parcel => parcel.trackingID === selectedOption.value )
    this.setState ({
      parcel: chosenParcel
    })
  }

  fieldChangeHandler = async (event) => { 
    let id = event.target.id
    await this.setState({
      [id]: event.target.value
    })
    console.log(this.state[id])
  }

  dropdownHandler = fieldName => async (selectedOption) => {
    await this.setState({
      [fieldName] : selectedOption.value
    })
    console.log(this.state[fieldName])
  }

  render () {
    return (
      <div className='page-container'>
        <Modal closeModal={this.hideModal} show={this.state.show} message={'Parcel successfully updated!'} /> 
        <Select
          className="basic-single dropdown-menu"
          classNamePrefix="select"
          placeholder="Select parcel to update..."
          name="parcel"
          options={this.state.parcels}
          onChange={this.displayParcel}
        />

        {(this.state.parcel) ? 
          <React.Fragment>
            <table className="table">
            <thead>
              <tr>
                  <th scope="col"><center>Tracking ID</center></th>
                  <th scope="col"><center>Description</center></th>
                  <th scope="col">Weight</th>
                  <th scope="col">House</th>
                  <th scope="col">Street</th>
                  <th scope="col">Country</th>
                  <th scope="col">Postal</th>
                  <th scope="col">Status</th>
                  <th scope="col">Location</th>
                  <th scope="col">Return Info</th>
              </tr>
            </thead>
            <tbody id="cursorPointer">
                {/*Rendering data*/}
                    <tr>
                        <td><center>{this.state.parcel.trackingID}</center></td>
                        <td>{this.state.parcel.itemDescription}</td>
                        <td><center>{this.state.parcel.parcelWeight}</center></td>
                        <td>{this.state.parcel.recipientAddress.house}</td>
                        <td>{this.state.parcel.recipientAddress.street}</td>
                        <td>{this.state.parcel.recipientAddress.country}</td>
                        <td>{this.state.parcel.recipientAddress.postalCode}</td>
                        <td>{this.state.parcel.status}</td>
                        <td>{this.state.parcel.location}</td>
                        <td>{this.state.parcel.returnInformation}</td>
                    </tr>
              </tbody>
              </table>
              
              <form onSubmit={this.submitHandler.bind(this)} className="update-form">
              <span className="auth-error">{this.state.infoMessage}</span>
                <p>Status:</p>
                <input type='text' id='status' className="update-field" onChange={this.fieldChangeHandler} />
                
                <p>Location:</p>
                <input type='text' id='location' className="update-field" onChange={this.fieldChangeHandler} />
                
                <p>Condition of parcel:</p>
                <span className='file-selected'>{this.getFileName(this.state.conditionFile)}</span>
                <input id='conditionFile'
                  type='file'
                  onChange={this.uploadHandler.bind(this)} />
                <label htmlFor='conditionFile' className='btn-secondary'>Choose File</label>



                <p>Transfer Ownership:</p>
                <Select
                  className="basic-single transfer-dropdown"
                  classNamePrefix="select"
                  placeholder="Select company for transfer..."
                  name="transfer"
                  options={this.state.logisticCos}
                  onChange={this.dropdownHandler("parcelTransfer")}
                />

                <input type='submit' value='UPDATE' className="btn-primary btn-submit" />
              </form>
            </React.Fragment>
          : null }
      </div>
    )
  }
}

export default Update;