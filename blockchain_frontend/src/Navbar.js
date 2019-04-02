import React from 'react';
import './Navbar.css'

const hideInput = (isUser) => {
  if (isUser)
    return null
  else 
    return 'hidden'
}

const renderOptions = (role, nav) => {
  switch (role) {
    case "retailer":
      return (
        <button type="button" 
          className="btn-input"
          onClick={() => nav("input")}>
          Input Parcel
        </button>
      )
    case "logistics":
      return (
        <button type="button" 
          className="btn-input"
          onClick={() => nav("update")}>
          Update Parcel
        </button>
      )
    case "custom":
      return (
        <button type="button" 
          className="btn-input"
          onClick={() => nav("inspect")}>
          Inspect Parcel
        </button>
      )
  }
}

const Navbar = (props) => (
  <div className="nav-bar">
    <div className="nav-items">
      <p hidden={hideInput(props.isUser)}><strong>Welcome</strong> {props.userID}</p>
      
      {(props.isUser) ? (
        <React.Fragment>
          <button type="button" className="btn-logout" onClick={props.logout}>Logout</button>
          {renderOptions(props.role, props.nav)}
        </React.Fragment>
       ) : (
          <React.Fragment>
            <button type="button" className="btn-register" onClick={() => props.nav("register")}>Register</button> 
            <button type="button" className="btn-login" onClick={() => props.nav("login")}>Login</button>
          </React.Fragment>
        )
      }
      
      <button type="button" className="btn-track" onClick={() => props.nav("track")}>Track Parcel</button>
    </div>
  </div>
)

export default Navbar