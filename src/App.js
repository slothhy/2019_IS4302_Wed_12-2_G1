import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Login from './Login.js';
import Register from './Register.js';
import Track from './Track.js';
import Input from './Input.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userID: "",
      logged_in: false,
      tab: "register"
    }
  }

  changeTab = (destination) => {
    this.setState({
      tab: destination
    })
  }

  loginUser = (user) => {
    this.setState({
      logged_in: true,
      userID: user
    })
  }

  render() {
    switch(this.state.tab) {
      case "register":
        return (
          <div className="page">
            <Navbar userID={this.state.userID} isUser={this.state.logged_in} nav={this.changeTab}/>
            <Register login={this.loginUser} redirect={this.changeTab}/>
          </div>
        )
      case "login":
        return (
          <div className="page">
            <Navbar userID={this.state.userID} isUser={this.state.logged_in} nav={this.changeTab}/>
            <Login login={this.loginUser} redirect={this.changeTab}/>
          </div>
        )
      case "input": 
        return (
          <div className="page">
            <Navbar userID={this.state.userID} isUser={this.state.logged_in} nav={this.changeTab}/>
            <Input />
          </div>
        )
      case "track": 
        return (
          <div className="page">
            <Navbar userID={this.state.userID} isUser={this.state.logged_in} nav={this.changeTab}/>
            <Track />
          </div>
        )
    }
  }
}

export default App;
