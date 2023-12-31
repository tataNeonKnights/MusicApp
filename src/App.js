import "./App.css";
import React, {useState} from "react";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import MusicPlayer from "./Components/MusicPlayer";
import Navbar from "./Components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playlists from "./Components/Playlists";

function App() {
  const [data, setData] = useState(1);
  return (
    <div className="App">

      {<Router>

        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/musicplayer" element={<MusicPlayer />}></Route>
          <Route exact path="/playlists" element={<Playlists />}></Route>
        </Routes>
        <Footer />

      </Router> 
      
      
      
      }
    </div>
  );
}

export default App;
