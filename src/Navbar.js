import React from 'react';
import './Navbar.css'

const hideInput = (isUser) => {
  if (isUser)
    return null
  else 
    return 'hidden'
}
const Navbar = (props) => (
  <div className="nav-bar">
    <div className="nav-items">
    {console.log(props)}
      <button type="button" className="btn-register" onClick={() => props.nav("register")}>Register</button>

      {(props.isUser) ? (<button type="button" className="btn-logout" onClick={() => props.nav("logout")}>Logout</button>) : (<button type="button" className="btn-login" onClick={() => props.nav("login")}>Login</button>)}

      <button type="button" 
              className="btn-input"
              onClick={() => props.nav("input")}
              hidden={hideInput(props.isUser)}>
        Input Parcel
      </button>
      
      <button type="button" className="btn-track" onClick={() => props.nav("track")}>Track Parcel</button>
    </div>
  </div>
)

export default Navbar