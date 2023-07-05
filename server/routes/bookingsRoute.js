const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")(
  "sk_test_51NOHfcSCaNtjKQutGnD76dwgy16Cef8aUgKCZ0sSwjTLdFbMVJoPV6wGXMiadA6TGpMW5wYH08kam3HBzEyawjLb00ZMDNZBpI"
);

router.post("/bookroom", async (req, resp) => {
  const { room, userid, fromDate, toDate, totalAmount, totalDays, token } =
    req.body;

  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid: userid,
      fromdate: fromDate,
      todate: toDate,
      totalamount: totalAmount,
      totaldays: totalDays,
      transactionid: "1234",
    });

    const booking = await newBooking.save();
    const roomtemp = await Room.findOne({ _id: room._id });
    roomtemp.currentBookings.push({
      bookingid: booking._id,
      fromDate,
      toDate,
      userid: userid,
      status: booking.status,
    });
    await roomtemp.save();

    resp.send("Your Payment successfull, Booked Successfully");
  } catch (error) {
    return resp.status(400).json({ error });
  }
});

router.post('/getbookingbyuserid',async(req, resp)=>{
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({userid :userid})
    resp.send(bookings);
  } catch (error) {
    return resp.status(400).json({error});
  }
});

router.post('/canclebooking', async(req , resp)=>{
  const{bookingid , roomid} = req.body;

  try {
    const bookingResult = await Booking.findOne({_id: bookingid});
    bookingResult.status = 'CANCELLED';
    await bookingResult.save();
    
    console.log(bookingResult); // Logging the updated booking result
    
    const roomResult = await Room.findOne({_id: roomid});
    const bookings = roomResult.currentBookings;
  
    const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid);
    roomResult.currentBookings = temp;
  
    await roomResult.save();
    
    resp.send('Your Room cancellation is Successful');
  } catch (error) {
    return resp.status(500).json({error});
  }
  
});

router.get('/getallbookings',async(req,resp)=>{
  try {
    const bookingData = await Booking.find();
    resp.send(bookingData);
  } catch (error) {
    
  }
})

module.exports = router;
