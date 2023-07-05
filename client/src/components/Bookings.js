import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/bookings/getallbookings");
        const data = response.data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        {loading && <Loader />}
        {error && <Error />}
      <div className="row">
        
        <div className="col-md-10">
          <h1>Bookings</h1>
          <table className="table table-bordered table-dark box-shadow">
            <thead>
               <tr>
                <th>Booking Id</th>
                <th>User Id</th>
                <th>Rooms</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
               </tr>
            </thead>
            <tbody>
                
                    {bookings.map(item=>{
                        return(
                           <tr>
                            <td>{item._id}</td>
                            <td>{item.userid}</td>
                            <td>{item.room}</td>
                            <td>{item.fromdate}</td>
                            <td>{item.todate}</td>
                            <td>{item.status}</td>
                           </tr>
                        );
                    })}
                   
               
            </tbody>
          </table>
          {bookings.length > 0 && <h4>There are {bookings.length} bookings</h4>}
        </div>
      </div>
    </div>
  );
}

export default Bookings;
