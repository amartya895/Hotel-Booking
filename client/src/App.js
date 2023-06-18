import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Link, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/home" exact Component={HomeScreen} />
        <Route path="/book/:roomid" exact Component={BookingScreen}/>
      </Routes>
    </div>
  );
}

export default App;
