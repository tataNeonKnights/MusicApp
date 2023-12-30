import "./App.css";

import Footer from "./Components/Footer";
import Home from "./Components/Home";
import MusicPlayer from "./Components/MusicPlayer";
import Navbar from "./Components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playlists from "./Components/Playlists";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/musicplayer" element={<MusicPlayer />}></Route>
          <Route exact path="/playlists" element={<Playlists />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
        </Routes>
        <Footer />

      </Router>
    </div>
  );
}

export default App;
