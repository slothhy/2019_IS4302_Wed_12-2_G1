//pull parcel from bc
//drop down for update parcel
import React, {Component} from 'react';
import Modal from './Modal.js';
import './Form.css'

const backend_url = "http://localhost:8000";
const hyperledger_url = "http://68.183.184.3:9000";
const axios = require('axios');
const JsonTable = require('ts-react-json-table');

class Update extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      data: "",
      parcelStatus: "",
      nextDest: ""
    }
  }

  async submitHandler (event) {
    event.preventDefault()
    
  }

  fieldChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log(this.state)
  }

  showModal = () =>
    this.setState({ show: true })

  hideModal = () =>
    this.setState({ show: false })


  async componentDidMount () {
    try {
      let resp = await axios.get(`${hyperledger_url}/api/org.parceldelivery.model.Parcel`, {
        params: {
        "filter" : {"where": {"logisticCompany": "resource:org.parceldelivery.model.LogisticCompany#fedex"}}
        }
      })
      this.setState({ data: resp.data })
    } catch (err) {
      console.error(err)
    }
  }

  

  getColumns = () => {
    let columns = [
      {key: 'trackingID', label: 'TrackingID'},
      {key: 'itemDescription', label: 'Description'},
      {key: 'parcelWeight', label: 'Weight'},
      {key: 'recipientAddress.house', label: 'House'},
      {key: 'recipientAddress.street', label: 'Street'},
      {key: 'recipientAddress.country', label: 'Country'},
      {key: 'recipientAddress.postalCode', label: 'Postal'},
      {key: 'status', label: 'Status'},
      {key: 'location', label: 'Location'},
      {key: 'returnInformation', label: 'Return Info'},
      //{key: 'logisticCompany', label: 'Logistic Company'}
      // {key: 'parcelstatus', label: 'Parcel Status', cell: function(row, columnKey) {
      //   return <input type="text" id="parcelStatus" onChange={this.fieldChangeHandler}></input>
      // }},
      // {key: 'nextDest', label: 'Next Destination', cell: function(row, columnKey) {
      //   return <input type="text" id="nextDest" onChange={this.fieldChangeHandler}></input>
      // }},
      {key: 'update', label: 'Update', cell: function(row, columnKey) {

        return <button onClick={ () => this.UpdateParcel }>Update</button>
      }}
    ]
    return columns;
  }

  getExcludeColumns = () => {
    let excludeColumns = [
      'invoice',
      '$class',
      'logisticCompany'
    ];
    return excludeColumns
  }

  UpdateParcel = event => {
    alert("hehe");
  }
  

  render () {
    return (
      <React.Fragment>
        <Modal closeModal={this.hideModal} show={this.state.show} message={`Parcel successfully logged! Tracking ID is ${this.state.trackingID}`} />
        <div className="table-form">
          <span className="auth-error">{this.state.infoMessage}</span>

          <JsonTable className="parcel-table" rows={this.state.data} columns={this.getColumns()} excludeColumns={this.getExcludeColumns()} />

        </div>
      </React.Fragment>
    )
  }
}

export default Update;