import React ,{useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function BookingScreen() {
  const { roomid } = useParams();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [room , setRoom] = useState();

  useEffect(()=>{
    const fetchData = async () => {
        try {
          setLoading(true);
          const data = (await axios.post("/api/rooms/getroombyid",{roomid})).data;
          setRoom(data);
        //   console.log(data)
          setLoading(false);
        } catch (error) {
          setError(error);
          // console.log(error);
          setLoading(false);
        }
      };
  
      fetchData();
  },[])

  return (
    <div>
      <h1>Booking Screen</h1>
      <h1>Room id: {roomid}</h1>
      <h1>Name</h1>
    </div>
  )
}

export default BookingScreen
