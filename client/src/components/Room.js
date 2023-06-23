import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row box-shadow">
      <div className="col-md-4">
        <img src={room.imagesUrl[0]} className="smallimg" alt="" />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>Max Count :{room.maxcount}</p>
          <p>Phone Number : {room.phoneNumber}</p>
          <p>Type : {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
          <Link to={`/book/${room._id}`} >
          <button className="btn btn-primary">Book Now</button>
          </Link>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imagesUrl.map(url=>{
              return(
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
          <p>{room.desc}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
