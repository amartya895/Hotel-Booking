import React from "react";

function Navbar() {


  const user = JSON.parse(localStorage.getItem('currentUser'))

  const handleLogout =()=>{
    localStorage.removeItem('currentUser');
    window.location.href ='/login';
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
           Hotel Booking System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {user ? <>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/profile">
                  {user.name}
                </a>
              </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/bookings">
                Booking
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout } href="/login" >
                  Logout
                </a>
              </li>
              </> : <>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              </>}
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
