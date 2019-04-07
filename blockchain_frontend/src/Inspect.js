import React, {Component} from 'react';
import './Form.css'
import { config } from './config.js';

var hyperledger_url = config.hyperledger_url;
const axios = require('axios');
const customs = config.custom_participants.split(",");
const customsPorts = config.custom_participants_ports.split(",");

class Inspect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trackingField: "",
      trackingIDs: [],
      transactions: [],
      txHistory: []
    }
  }

  async submitHandler (event) {
    event.preventDefault()
    try {
      this.state.trackingIDs = this.state.trackingField.split('\n');
      //console.log(this.state.trackingIDs);

      let tempTranArray = []
      
      var customIndex = customs.indexOf(this.props.userID);
      var customPort = customsPorts[customIndex];
      var hyperledgerConnection = hyperledger_url +  ":" + customPort;
      for (var i = 0; i < this.state.trackingIDs.length; i++) {
        let bc_resp = await axios.post(`${hyperledgerConnection}/api/org.parceldelivery.model.QueryByCustom`, {
        "$class": "org.parceldelivery.model.QueryByCustom", "trackingID": this.state.trackingIDs[i]
        })
        tempTranArray[i] = bc_resp.data.transactionId;
      }

      await this.setState({
        transactions: tempTranArray
      })

      let tempTXArray = []

      for (var i = 0; i < this.state.transactions.length; i++) {
        let transresp = await axios.get(`${hyperledgerConnection}/api/system/historian/${this.state.transactions[i]}`).then((response) => {
          tempTXArray[i] = response.data
        });
      }
      console.log(tempTXArray)

      await this.setState({
        txHistory: tempTXArray
      })

    } catch (err) {
      console.error(err)
    }
  }

  fieldChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log(this.state.trackingField)
  }

  render () {
    return (
      <div className="page-container">
        <form onSubmit={this.submitHandler.bind(this)} className="tracking-form">
          <p>Tracking Numbers:</p>
          <textarea rows="5" cols="20"
            id='trackingField'
            onChange={this.fieldChangeHandler}
             />
          <input type='submit' className="btn-primary btn-submit-track"/>
        </form>

        <React.Fragment>
          {this.state.txHistory.length === 0 ? 
            null
            : (
             <div className="card-list">
              {this.state.txHistory.map((transaction) =>
                <article className="data-card">
                  <p><b>TrackingID: </b>{transaction.eventsEmitted[0].customsview.trackingID}</p>
                  <p><b>Item Description: </b>{transaction.eventsEmitted[0].customsview.itemDescription}</p>
                  <p><b>Parcel Weight: </b>{transaction.eventsEmitted[0].customsview.parcelWeight}</p>
                  <p><b>Recipient Address: </b>{`${transaction.eventsEmitted[0].customsview.recipientAddress.house + ' ' + transaction.eventsEmitted[0].customsview.recipientAddress.street + ' ' +  transaction.eventsEmitted[0].customsview.recipientAddress.country + ' ' +  transaction.eventsEmitted[0].customsview.recipientAddress.postalCode}`}</p>
                  <p><b>Logistics Company: </b>{transaction.eventsEmitted[0].customsview.logisticCompany.split('#')[1]}</p>
                  <img src={transaction.eventsEmitted[0].customsview.invoice}/>
                </article>
              )}
             </div> 
          )}
        </React.Fragment>


      </div>
    )
  }
}

export default Inspect;