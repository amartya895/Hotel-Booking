import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";

function AddRoom() {
  const [name, setName] = useState();
  const [rent, setRent] = useState();
  const [count, setCount] = useState();
  const [desc, setDesc] = useState();
  const [phone, setPhone] = useState();
  const [type, setType] = useState();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [img3, setImg3] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleAddRoom = async () => {
    const roomData = {
      name,
      rent,
      count,
      desc,
      phone,
      type,
      img1,
      img2,
      img3,
    };
    console.log(roomData);
    try {
      setLoading(true);
      const result = (await axios.post("api/rooms/addrooms", roomData)).data;
      setLoading(false);
      swal
        .fire("Congrats", "Your Room added Successfully", "success")
        .then((result) => {
          setName("");
          setDesc("");
          setCount("");
          setImg1("");
          setImg2("");
          setImg3("");
          setRent("");
          setPhone("");
          setType("");
        });
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal.fire("oops", "Something Went wrong", "error");
    }
  };

  return (
    <div>
      <h1>Add Room Form</h1>
      {loading && <Loader />}
        {error && <Error />}
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Name "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Enter Rent per Day "
          value={rent}
          onChange={(e) => setRent(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Enter Max Count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Enter Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Enter Image url 1"
          value={img1}
          onChange={(e) => setImg1(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Enter Image url 2"
          value={img2}
          onChange={(e) => setImg2(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Enter Image url 3"
          value={img3}
          onChange={(e) => setImg3(e.target.value)}
        />
        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={handleAddRoom}
        >
          ADD ROOM
        </button>
      </div>
    </div>
  );
}

export default AddRoom;
