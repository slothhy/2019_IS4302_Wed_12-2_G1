import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Login from './Login.js';
import Register from './Register.js';
import Track from './Track.js';
import Input from './Input.js';
import Update from './Update.js';
import Inspect from './Inspect.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    if (localStorage.hasOwnProperty('logged_in')) {
      this.state = {
        userID: JSON.parse(localStorage.getItem('userID')),
        logged_in: true,
        role: JSON.parse(localStorage.getItem('role')),
        tab: ""
      }
    } else {
      this.state = {
        userID: "",
        logged_in: false,
        role: "",
        tab: "register"
      }
    }
  }

  changeTab = (destination) => {
    this.setState({
      tab: destination
    })
  }

  loginUser = (user, role) => {
    this.setState({
      logged_in: true,
      role: role,
      tab: "",
      userID: user,
    }, () => {
      localStorage.setItem('logged_in', "true")
      localStorage.setItem('role', JSON.stringify(this.state.role))
      localStorage.setItem('userID', JSON.stringify(this.state.userID))
    })
  }

  logoutUser = () => {
    this.setState({
      logged_in: false,
      authtoken: "",
      tab: "",
      userID: ""
    }, () => {
      localStorage.clear()
    })
  }

  render() {
    switch(this.state.tab) {
      case "register":
        return (
          <div className="page">
            <Navbar userID={this.state.userID} role={this.state.role} isUser={this.state.logged_in} logout={this.logoutUser} nav={this.changeTab}/>
            <Register login={this.loginUser} />
          </div>
        )
      case "login":
        return (
          <div className="page">
            <Navbar userID={this.state.userID} role={this.state.role} isUser={this.state.logged_in} logout={this.logoutUser} nav={this.changeTab}/>
            <Login login={this.loginUser} />
          </div>
        )
      case "input": 
        return (
          <div className="page">
            <Navbar userID={this.state.userID} role={this.state.role} isUser={this.state.logged_in} logout={this.logoutUser} nav={this.changeTab}/>
            <Input userID={this.state.userID} />
          </div>
        )
      case "update":
        return (
          <div className="page">
            <Navbar userID={this.state.userID} role={this.state.role} isUser={this.state.logged_in} logout={this.logoutUser} nav={this.changeTab}/>
            <Update userID={this.state.userID} />
          </div>
        )
      case "inspect":
        return (
          <div className="page">
            <Navbar userID={this.state.userID} role={this.state.role} isUser={this.state.logged_in} logout={this.logoutUser} nav={this.changeTab}/>
            <Inspect userID={this.state.userID} />
          </div>
        )
      case "track": 
        return (
          <div className="page">
            <Navbar userID={this.state.userID} role={this.state.role} isUser={this.state.logged_in} logout={this.logoutUser} nav={this.changeTab}/>
            <Track />
          </div>
        )
      default:
        return (
          <div className="page">
            <Navbar userID={this.state.userID} role={this.state.role} isUser={this.state.logged_in} logout={this.logoutUser} nav={this.changeTab}/>
            <div className="welcome-message">Welcome to Parcel Tracking</div>
          </div>
        )
    }
  }
}

export default App;
