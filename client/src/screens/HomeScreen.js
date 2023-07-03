import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [dupilcateRooms, setDuplicateRooms] = useState();
  const [Searchkey, setSearchKey] = useState();
  const [type, setType] = useState("all");

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

  const filterBySearch = () => {
    const tempRooms = dupilcateRooms.filter((room) =>
      room.name.toLowerCase().includes(Searchkey.toLowerCase())
    );

    setRooms(tempRooms);
  };

  const filterByType = (e) => {
    setType(e);
    if (e !== "all") {
      const tempRoom = dupilcateRooms.filter(
        (room) => room.type.toLowerCase() === e.toLowerCase()
      );
      setRooms(tempRoom);
    } else {
      setRooms(dupilcateRooms);  
    }
  };

  return (
    <div className="container">
      <div className="row box-shadow">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-5 ">
          <input
            type="text"
            placeholder="Search rooms"
            value={Searchkey}
            className="form-control"
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>
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
