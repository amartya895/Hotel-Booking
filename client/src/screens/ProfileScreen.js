import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

function ProfileScreen() {
  const tabStyles = {
    tabLabel: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "black",
    },
  };

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div style={{ margin: "20px 0px 0px 20px" }}>
      <Tabs
        defaultActiveKey="1"
        left
        items={new Array(2).fill(null).map((_, i) => {
          const tabName = ["MyProfile", "MyBookings"];
          const id = String(i + 1);
          return {
            label: <span style={tabStyles.tabLabel}>{tabName[i]}</span>,
            key: id,
            children: (
              <div>
                {id === "1" && <Profile />}
                {id === "2" && <MyBookings />}
              </div>
            ),
          };
        })}
      />
    </div>
  );
}

export default ProfileScreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/bookings/getbookingbyuserid", {
          userid: user._id,
        });
        console.log(response.data);
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user._id]);

  return (
    <div className="row">
      <div className="col-md-6">
        {loading && <Loader />}
        {error && <Error />}
        {bookings &&
          bookings.map((book) => {
            return (
              <div className="box-shadow">
                <h4>{book.room}</h4>
                <h5>Booking Id : {book._id}</h5>
                <p>
                  <b>Check In</b> : {book.fromdate}
                </p>
                <p>
                  <b>Check Out</b> : {book.todate}
                </p>
                <p>
                  <b>Amount</b> : {book.totalamount}
                </p>
                <p>
                  Status :{" "}
                  <b>{book.status == "booked" ? "CONFIRMED" : "CANCELLED"}</b>
                </p>

                <button className="btn btn-primary text-right">Cancle</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export function Profile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      <h1>My Profile</h1>
      <br />
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
      <h3>Is Admin: {user.isAdmin ? "YES" : "NO"}</h3>
    </div>
  );
}
