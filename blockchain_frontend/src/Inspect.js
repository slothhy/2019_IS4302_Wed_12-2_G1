import React, {Component} from 'react';
import './Form.css'


const backend_url = "http://localhost:8000";
const hyperledger_url = "http://68.183.184.3:9000";
const axios = require('axios');

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

      for (var i = 0; i < this.state.trackingIDs.length; i++) {
        let bc_resp = await axios.post(`${hyperledger_url}/api/org.parceldelivery.model.QueryByCustom`, {
        "$class": "org.parceldelivery.model.QueryByCustom", "trackingID": this.state.trackingIDs[i]
        })
        tempTranArray[i] = bc_resp.data.transactionId;
      }

      await this.setState({
        transactions: tempTranArray
      })

      let tempTXArray = []

      for (var i = 0; i < this.state.transactions.length; i++) {
        let transresp = await axios.get(`${hyperledger_url}/api/system/historian/${this.state.transactions[i]}`).then((response) => {
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