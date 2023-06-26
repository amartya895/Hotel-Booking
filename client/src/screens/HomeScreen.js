import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;


function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromDate , setFromDate] = useState();
  const [toDate , setToDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getAllRooms")).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterByDate = (dates)=>{
   setFromDate((dates[0].format('DD-MM-YYYY')));
    setToDate((dates[1].format('DD-MM-YYYY')));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 mt-3">
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate}/>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
         <Loader/>
        ) : error ? (
          <h1><Error/></h1>
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
