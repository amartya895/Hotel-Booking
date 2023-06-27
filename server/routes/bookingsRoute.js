const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

const Room = require("../models/room");

router.post("/bookroom", async (req, resp) => {
  const { room, userid, fromDate, toDate, totalAmount, totalDays } = req.body;

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
    roomtemp.currentBookings.push({ bookingid: booking._id, fromDate, toDate , userid : userid , status : booking.status });
    await roomtemp.save();
    resp.send("Room Booked Successfully");
  } catch (error) {
    return resp.status(400).json({ error: error.message });
  }
});

module.exports = router;
