import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Login from './Login.js';
import Register from './Register.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged_in: false,
      tab: "register"
    }
  }

  changeTab = (destination) => {
    this.setState({
      tab: destination
    })
  }

  render() {
    switch(this.state.tab) {
      case "register":
        return (
          <div className="page">
            <Navbar isUser={this.state.logged_in} nav={this.changeTab}/>
            <Register />
          </div>
        )
      case "login":
        return (
          <div className="page">
            <Navbar isUser={this.state.logged_in} nav={this.changeTab}/>
            <Login />
          </div>
        )
      case "input": 
        return (
          <div className="page">
            <Navbar isUser={this.state.logged_in} nav={this.changeTab}/>
            <div>INPUT</div>
          </div>
        )
      case "track": 
        return (
          <div className="page">
            <Navbar isUser={this.state.logged_in} nav={this.changeTab}/>
            <div>TRACK</div>
          </div>
        )
    }
  }
}

export default App;
