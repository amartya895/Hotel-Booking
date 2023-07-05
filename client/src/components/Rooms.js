import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getAllRooms");
        const data = response.data;
        setRooms(data);
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
          <h1>Rooms</h1>
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>Room Id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent/Days</th>
                <th>Max Count</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 &&
                rooms.map((room) => (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentPerDay}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phoneNumber}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <h1>There are {rooms.length} Rooms available</h1>
    </div>
  );
}

export default Rooms;
