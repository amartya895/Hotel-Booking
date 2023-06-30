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
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,

        customer: customer.id,
        currency: "INR",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
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
        resp.send("Room Booked Successfully");
      } catch (error) {
        return resp.status(400).json({ error: error.message });
      }
    }

    resp.send("Your Payment successfull, Booked Successfully");
  } catch (error) {
    return resp.status(400).json({ error });
  }
});

module.exports = router;
