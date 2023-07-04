const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/register', async(req ,resp)=>{

    const newUser = new User({name:req.body.name , email:req.body.email , password:req.body.password});

    try {
        const user = await newUser.save();
        resp.send('User Registerd Successfully');
    } catch (error) {
        return resp.status(400).json({message : 'something went wrong'});
    }

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body; // data which are comming through url is acces from req.body 
    //and destructure to store in email and password
  
    try {
      const user = await User.findOne({ email, password });

      //if there any user with email and password same it , will send back the user details ;
  
      if (user) {
        const temp = {
            name: user.name,
            email : user.email,
            isAdmin: user.isAdmin,
            _id : user._id
        }
        res.send(temp);
      } else {
        res.status(400).json({ message: 'Login failed' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router