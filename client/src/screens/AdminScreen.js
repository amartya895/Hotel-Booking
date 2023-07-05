import React, { useEffect } from "react";
import { Tabs } from "antd";
import Bookings from "../components/Bookings";
import Rooms from "../components/Rooms";
import Users from "../components/Users";
import AddRoom from "../components/AddRoom";

function AdminScreen() {
  const tabStyles = {
    tabLabel: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "Blue",
     
    },
  };

  useEffect(()=>{
    if(!JSON.parse(localStorage.getItem('currentUser')).isAdmin)
    {
      window.location.href = '/home';
    }
  })

  return (
    <div style={{ margin: "20px 20px 20px 20px" }} className="box-shadow">
        <h3 className="text-center">Admin Panel</h3>
      <Tabs
    
        defaultActiveKey="1"
        type="card"
        size='middle'
        items={new Array(4).fill(null).map((_, i) => {
          const tabName = ["Bookings", "Rooms", "Add Room", "User"];
          const id = String(i + 1);
          return {
            label: <span style={tabStyles.tabLabel}>{tabName[i]}</span>,
            key: id,
            children: (
              <div>
                {id === "1" && <Bookings/>}
                {id === "2" && <Rooms/>}
                {id === "3" && <AddRoom/>}
                {id === "4" && <Users/>}
              </div>
            ),
          };
        })}
      />
    </div>
  );
}

export default AdminScreen;
