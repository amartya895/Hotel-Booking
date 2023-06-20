import React,{useState } from 'react'
import axios from 'axios';

function LoginScreen() {
  
    const [email , setemail] = useState('');
    const [password , setPassword] = useState('');
    

    const Login = async()=>{
        
            const userData ={
               email, password
            }

            try {
              const result = (await axios.post('/api/users/login',userData)).data 
             } catch (error) {
              console.log(error)
             }
    
            // console.log(`${userData} logged Successfully`);
        
    
    }
  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="box-shadow p-3 mt-5">
            <h1 className="register-head">Login Here</h1>
            
            <input
              type="email"
            value={email}
              className="form-control"
              id=""
              onChange={(e)=>setemail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"
              placeholder="Password"
              id=""
            />
           
            <button className="btn btn-primary mt-3" onClick={Login}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
