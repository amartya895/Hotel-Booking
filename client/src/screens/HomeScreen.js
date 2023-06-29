import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

// pk_test_51NOHfcSCaNtjKQutgNPvWOQ8Ipd942UWkuZAi6ce5hln5Mh5ukgdQYX7YAXMCChapeDn4DUXkRBiKV3QUBC0HrPS00vhRIdq2b

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [dupilcateRooms, setDuplicateRooms] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getAllRooms")).data;
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByDate = (dates) => {
    //from date
    console.log(dates[0].format("DD-MM-YYYY"));
    setFromDate(dates[0].format("DD-MM-YYYY"));
    //to date
    console.log(dates[1].format("DD-MM-YYYY"));
    setToDate(dates[1].format("DD-MM-YYYY"));

    //tempRooms
    var tempRooms = [];

    for (const room of dupilcateRooms) {
      var availability = false;

      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          //check between or equal to dates
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              dates[0].format("DD-MM-YYYY") !== booking.fromDate &&
              dates[0].format("DD-MM-YYYY") !== booking.toDate &&
              dates[1].format("DD-MM-YYYY") !== booking.fromDate &&
              dates[1].format("DD-MM-YYYY") !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      } else {
        availability = true;
      }

      if (availability === true) {
        tempRooms.push(room);
      }
    }

    setRooms(tempRooms);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 mt-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <h1>
            <Error />
          </h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} FromDate={fromDate} ToDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
