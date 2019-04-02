import React, {Component} from 'react';
import './Form.css'
import Select from 'react-select'


const backend_url = "http://localhost:8000";
const hyperledger_url = "http://68.183.184.3:9000";
const axios = require('axios');

class Track extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tracking: "",
      transactions: null
    }
  }

  async submitHandler (event) {
    event.preventDefault()
    try {
      let resp = await axios.get(`${backend_url}/parcels/getParcelTx`, {
        parcelID: this.state.tracking
      })      
      this.state.transactions = resp.data.txHistory
      console.log(this.state.transactions)
    } catch (err) {
      console.error(err)
    }
  }

  fieldChangeHandler = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
    console.log(this.state.tracking)
  }

  render () {
    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler.bind(this)} className="user-form">
          <p>Tracking Number:</p>
          <input type='text'
            id='tracking'
            onChange={this.fieldChangeHandler}
            className='input-field' />

          <button type='submit' className="btn-primary btn-submit">
            TRACK
          </button>
        </form>

        {(this.state.transactions) ? 
          <React.Fragment>

          </React.Fragment>
        : null }
      </React.Fragment>
    )
  }
}

export default Track;