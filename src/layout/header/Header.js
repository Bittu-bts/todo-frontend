import React from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";

export default function Header() {
  
  var loggedin = localStorage.getItem('isLoggedIn') || false;
  var user = JSON.parse(localStorage.getItem('user')) || false;

  console.log(loggedin, user)

  // if (!loggedin) {
  //   return <Redirect to='/login' />
  // }

  const name = user && user.name ? user.name : false

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('isLoggedIn')
    window.location.href = '/login';
  } 

  // console.log('loggedin = ', loggedin)
  // console.log('name = ', user.name)
    return (
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
  <Link className="navbar-brand" to="/">Home
    </Link>
    {
      name && loggedin ? (
        <React.Fragment>
          <span>{name}</span>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </React.Fragment>
      ) : <Link className="navbar-brand" to="/login">Login</Link>
    }
    
    <button 
    className="navbar-toggler" 
    type="button" 
    data-bs-toggle="collapse" 
    data-bs-target="#navbarSupportedContent" 
    aria-controls="navbarSupportedContent"
    aria-expanded="false" 
    aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>
        </div>
    );
}
