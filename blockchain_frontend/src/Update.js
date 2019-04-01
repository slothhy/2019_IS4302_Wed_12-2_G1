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
      data: [],
      parcel: ""
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
      console.log(this.state.data)
    } catch (err) {
      console.log("RARARAR")
      console.error(err)
    }
  } 

  // getColumns = () => {
  //   function updateParcel(row) {
  //     this.setState({parcel: row});
  //     console.log(this.state)
  //     //change page to a page with selected parcel

  //   }

  //   let columns = [
  //     {key: 'trackingID', label: 'TrackingID'},
  //     {key: 'itemDescription', label: 'Description'},
  //     {key: 'parcelWeight', label: 'Weight'},
  //     {key: 'recipientAddress.house', label: 'House'},
  //     {key: 'recipientAddress.street', label: 'Street'},
  //     {key: 'recipientAddress.country', label: 'Country'},
  //     {key: 'recipientAddress.postalCode', label: 'Postal'},
  //     {key: 'status', label: 'Status'},
  //     {key: 'location', label: 'Location'},
  //     {key: 'returnInformation', label: 'Return Info'},
  //     // {key: 'logisticCompany', label: 'Logistic Company'},
  //     // {key: 'parcelstatus', label: 'Parcel Status', cell: function(row, columnKey) {
  //     //   return <input type="text" id="parcelStatus" onChange={this.fieldChangeHandler}></input>
  //     // }},
  //     // {key: 'nextDest', label: 'Next Destination', cell: function(row, columnKey) {
  //     //   return <input type="text" id="nextDest" onChange={this.fieldChangeHandler}></input>
  //     // }},
  //     {key: 'update', label: 'Update', cell: function(row, columnKey) {
  //       return <button onClick={() => updateParcel(row)}>Update</button>
  //     }}
  //   ]
  //   return columns;
  // }

  // getExcludeColumns = () => {
  //   let excludeColumns = [
  //     'invoice',
  //     '$class',
  //     'logisticCompany'
  //   ];
  //   return excludeColumns
  // }

  edit = (data) => { 
    // Do whatever you want
    console.log(data)
  }

  render () {
    return (
      <React.Fragment>
        <Modal closeModal={this.hideModal} show={this.state.show} message={`Parcel successfully logged! Tracking ID is ${this.state.trackingID}`} />
        <div className="table-form">
          <span className="auth-error">{this.state.infoMessage}</span>
          <table className="table table-hover table-bordered">
          <thead>
              <tr>
                 <th scope="col"><center>Edit</center></th>
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
              {this.state.data.map( (item, key) => {
                 return (
                   <tr key = {key} >
                     <td>
                     <center>
                     <button onClick={() => this.edit(item)}>Edit</button>
                        </center>
                      </td>
                      <td><center>{item.trackingID}</center></td>
                      <td>{item.itemDescription}</td>
                      <td><center>{item.parcelWeight}</center></td>
                      <td>{item.recipientAddress.house}</td>
                      <td>{item.recipientAddress.street}</td>
                      <td>{item.recipientAddress.country}</td>
                      <td>{item.recipientAddress.postalCode}</td>
                      <td>{item.status}</td>
                      <td>{item.location}</td>
                      <td>{item.returnInformation}</td>
                   </tr>
                 )
              })}
          </tbody>
     </table>

        </div>
      </React.Fragment>
    )
  }
}

export default Update;