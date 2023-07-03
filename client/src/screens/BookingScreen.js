import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import Loader from "../components/Loader";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import swal from 'sweetalert2';

function BookingScreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const fromDateObj = moment(fromDate, "DD-MM-YYYY");
  const toDateObj = moment(toDate, "DD-MM-YYYY");
  const totalDays = toDateObj.diff(fromDateObj, "days");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post("/api/rooms/getroombyid", { roomid });
        setRoom(data);
        setLoading(false);
        setTotalAmount(data.rentPerDay * (totalDays + 1));
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [roomid, totalDays]);

  const onToken = async (token) => {
    console.log(token);
    const bookingDetails = {
      room: room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate: fromDate,
      toDate: toDate,
      totalAmount: totalAmount,
      totalDays: totalDays + 1,
      token,
    };

    try {
      setLoading(true)
      console.log(bookingDetails);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      console.log(result);
      setLoading(false);
      swal.fire('Congrulation' , 'Your Room Booked Successfully','success').then((result)=>{
        window.location.href = '/bookings'
      });
    } catch (error) {
      setLoading(false)
      console.error(error);
      swal.fire('Opps' , 'Something Went Wrong','error');
    }
  };

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <h1>Error..</h1>
      ) : (
        <div>
          <div className="row justify-content-center mt-5 box-shadow">
            <div className="col-md-6">
              <h1 style={{ textAlign: "center" }}>{room.name}</h1>
              <Carousel>
                {room.imagesUrl.map((url) => (
                  <Carousel.Item key={url}>
                    <img
                      className="d-block w-100 bigimg"
                      src={url}
                      alt="Slide"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="col-md-5">
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  Name: {JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p>From Date: {fromDate}</p>
                <p>To Date: {toDate}</p>
                <p>Max Count: {room.maxcount}</p>
              </b>

              <div>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total Days: {totalDays + 1}</p>
                  <p>Rent Per Day: {room.rentPerDay}</p>
                  <p>Total Amount: {totalAmount}</p>
                </b>

                <div>
                  <StripeCheckout
                    amount={totalAmount * 100}
                    currency="INR"
                    token={onToken}
                    stripeKey="pk_test_51NOHfcSCaNtjKQutgNPvWOQ8Ipd942UWkuZAi6ce5hln5Mh5ukgdQYX7YAXMCChapeDn4DUXkRBiKV3QUBC0HrPS00vhRIdq2b"
                  >
                    <button
                      style={{ float: "right" }}
                      className="btn btn-primary"
                    >
                      Pay Now
                    </button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingScreen;
