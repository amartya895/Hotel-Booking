const express = require('express');
const router = express.Router();

const Room = require('../models/room');

router.get('/getAllRooms', async(req , resp)=>{

   try {

    const rooms = await Room.find({});

    return resp.send(rooms);
    
   } catch (error) {
        return resp.status(400).json({message:error});
   }
});

router.post('/addrooms',async(req,resp)=>{

   const {name , rent , count , desc, phone , type , img1 , img2 , img3} = req.body;

   const newRoom = new Room({name : name , maxcount : count , phoneNumber : phone,rentPerDay : rent , imagesUrl :[img1 , img2 , img3] ,type : type , desc : desc})

   try {
      const room = await newRoom.save();
      resp.send('Room added Successfully');
   } catch (error) {
      
      return resp.status(400).json({message : 'something went wrong'});
   }


});


router.post('/getroombyid', async(req , resp)=>{

   const roomid = req.body.roomid;

   try {

    const room = await Room.findOne({_id : roomid});

    return resp.send(room);
    
   } catch (error) {
        return resp.status(400).json({message:error});
   }
});

module.exports = router;