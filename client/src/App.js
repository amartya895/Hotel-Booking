import "./App.css";
import Navbar from "./components/Navbar";
import { Route,  Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookingScreen from "./screens/BookingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
     
      <Routes>
        <Route path="/home" exact Component={HomeScreen} />
        <Route path="/book/:roomid/:fromDate/:toDate" exact Component={BookingScreen}/>
        <Route path="/register" exact Component={RegisterScreen}/>
        <Route path="/login" exact Component={LoginScreen}/>
        <Route path="/profile" exact Component={ProfileScreen}/>
      </Routes>
    </div>
  );
}

export default App;
