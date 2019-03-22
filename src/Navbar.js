import React from 'react';
import './Navbar.css'

const hideInput = (isUser) => {
  if (isUser)
    return null
  else 
    return 'hidden'
}
const Navbar = (props) => (
  <div className="nav">
  {console.log(props)}
    <button type="button" className="btn-register">Register</button>
    {(props.isUser) ? (<button type="button" className="btn-logout">Logout</button>) : (<button type="button" className="btn-login">Login</button>)}
    <button type="button" 
            className="btn-input"
            hidden={hideInput(props.isUser)}>
      Input Parcel
    </button>
    <button type="button" className="btn-track">Track Parcel</button>
  </div>
)

export default Navbar