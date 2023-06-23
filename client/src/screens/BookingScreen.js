import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import Loader from "../components/Loader";

function BookingScreen() {
  const { roomid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.post("/api/rooms/getroombyid", { roomid }))
          .data;
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(error);

        setLoading(false);
      }
    };

    fetchData();
  }, [roomid]);

  return (
    <div className="m-5">
      {loading ? (
        <Loader/>
        
      ) : error ? (
        <h1>Error..</h1>
      ) : (
        <div>
          <div className="row justify-content-center mt-5  box-shadow">
            <div className="col-md-6">
              <h1 style={{ textAlign: "center" }}>{room.name}</h1>
              <Carousel>
                {room.imagesUrl.map((url) => {
                  return (
                    <Carousel.Item>
                      <img
                        className="d-block w-100  bigimg"
                        src={url}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
            <div className="col-md-5">
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name : Amartya </p>
                <p>From Date : 19-03-2023 </p>
                <p>To Date : 21-03-2023</p>
                <p>Max Count : {room.maxcount}</p>
              </b>

              <div>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total Days : 3</p>
                  <p>Rent Per Day : {room.rentPerDay}</p>
                  <p>Total Amount : {room.rentPerDay * 3}</p>
                </b>

                <div>
                  <button
                    style={{ float: "right" }}
                    className="btn btn-primary"
                  >
                    Pay Now
                  </button>
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
