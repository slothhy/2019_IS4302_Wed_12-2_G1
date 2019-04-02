import React, {Component} from 'react';
import './Form.css'


const backend_url = "http://localhost:8000";
const hyperledger_url = "http://68.183.184.3:9000";
const axios = require('axios');

class Track extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracking: "",
      transactions: null,
      txHistory: []
    }
  }

  getTxName = txName => {
    switch (txName) {
      case "org.parceldelivery.model.CreateParcel":
        return "Create Parcel"
      case "org.parceldelivery.model.UpdateParcel":
        return "Update Parcel"
    }
  }

  async submitHandler (event) {
    event.preventDefault()
    try {
      let resp = await axios.get(`${backend_url}/parcels/getParcelTx`, {
        params: {
          parcelID: this.state.tracking
        }
      })
      await this.setState({
        transactions: resp.data.txHistory
      })
      let tempTXArray = []

      for (var i = 0; i < this.state.transactions.length; i++) {
        let transresp = await axios.get(`${hyperledger_url}/api/system/historian/${this.state.transactions[i]}`).then((response) => {
          tempTXArray[i] = response.data
        });
      }

      this.setState({
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
  }

  render () {
    return (
      <div className="page-container">
        <form onSubmit={this.submitHandler.bind(this)} className="tracking-form">
          <p>Tracking Number:</p>
          <input type='text'
            id='tracking'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <button type='submit' className="btn-primary btn-submit-track">
            TRACK
          </button>
        </form>

        <React.Fragment>
          {this.state.txHistory.length === 0 ? 
            null
            : (
             <div className="card-list">
              {this.state.txHistory.map((transaction) =>
                <article className="data-card">
                  <h3>{this.getTxName(transaction.transactionType)}</h3>
                  <p><b>Location: </b>{transaction.eventsEmitted[0].location}</p>
                  <p><b>Logistics Company: </b>{transaction.eventsEmitted[0].logisticCompany.split('#')[1]}</p>
                  <p><b>Status: </b>{transaction.eventsEmitted[0].status}</p>
                  <p><b>Timestamp: </b>{`${new Date(transaction.transactionTimestamp)}`}</p>
                  
                  <p className="parcel-condition"><img src={transaction.eventsEmitted[0].conditionOfParcel}/></p>
                </article>
              )}
             </div> 
          )}
        </React.Fragment>


      </div>
    )
  }
}

export default Track;