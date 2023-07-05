import React from 'react'
import {Link} from 'react-router-dom'
function LandingScreen() {
  return (
    <div className='row landing justify-content-center'>

        <div className="col-md-9 text-center my-auto" style={{ borderRight: '1px solid white'}}>
            <h1  style={{color:'white',fontWeight:'bold' ,fontSize:'120px'}}>Hotel Booking System</h1>
            <h5 style={{color:'white',fontWeight:500,marginTop:50}}>"Think Holiday , Think Hotel Booking"</h5>
            <Link  to='/home'>
            <button className='btn btn-primary' style={{backgroundColor:'white',color:'black',marginTop:20}}>Get Started</button>
            </Link>
        </div>
      
    </div>
  )
}

export default LandingScreen;
