import React, { useState } from "react";
import {Modal,Button} from 'react-bootstrap'
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function RegisterScreen() {
    const [name , setName] = useState('');
    const [email , setemail] = useState('');
    const [password , setPassword] = useState('');
    const [cpassword , setCpassword] = useState('');
    const [success , setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [show, setShow] = useState(false);

    const Register = async()=>{
        if(password === cpassword)
        {
            const userData ={
                name,email, password, cpassword
            }
    
           try {
            setLoading(true)
            const result = (await axios.post('/api/users/register',userData)).data 
            setLoading(false);
            setSuccess(true) 
            setShow(true);

            setName('')
            setemail('')
            setPassword('')
            setCpassword('')

           } catch (error) {
            console.log(error)
            setError(true)
            setLoading(false)
           }
        }
        else{
            console.log("password didnt matched");
            
        }
    
    }

    const handleClose = () => setShow(false);
  

  return (
    <div>
      {loading && <h1><Loader/></h1>}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
        {error && <h1><Error/></h1>}
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {success && <h1><Success message="Registration Successful"/></h1> }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

//make a modal popup for few second that reg success; with animated tick;

export default RegisterScreen;
