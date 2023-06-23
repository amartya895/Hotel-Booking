import React, { useState } from "react";
import axios from "axios";

function RegisterScreen() {
    const [name , setName] = useState('');
    const [email , setemail] = useState('');
    const [password , setPassword] = useState('');
    const [cpassword , setCpassword] = useState('');

    const Register = async()=>{
        if(password === cpassword)
        {
            const userData ={
                name,email, password, cpassword
            }
    
           try {
            const result = (await axios.post('/api/users/register',userData)).data 
           } catch (error) {
            console.log(error)
           }
        }
        else{
            console.log("password didnt matched");
        }
    
    }

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          <div className="box-shadow p-3 mt-5">
            <h1 className="register-head">Register Here</h1>
            <input
              type="text"
                value={name}
              className="form-control"
              onChange={(e)=>setName(e.target.value)}
              id=""
              placeholder="Name"
            />
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
            <input
              type="password"
              value={cpassword}
              onChange={(e)=>setCpassword(e.target.value)}
              className="form-control"
              placeholder="Re-Enter Password"
              id=""
            />
            <button className="btn btn-primary mt-3" onClick={Register}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
