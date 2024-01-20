import "./App.css";

import Footer from "./Components/Footer";
import Home from "./Components/Home";
import MusicPlayer from "./Components/MusicPlayer";
import Navbar from "./Components/Navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playlists from "./Components/Playlists";
import PlaylistsState from "./Memory/PlaylistsState";
import SongsState from "./Memory/SongsState";
import UsersState from "./Memory/UsersState";
import CurrentPlaylistState from "./Memory/CurrentPlaylistState";
import LyricsSynchronizer from "./Helpers/LyricsSynchronizer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import AboutPage from "./Components/AboutPage";
import ContactUsPage from "./Components/ContactUsPage";



function App() {
  return (
    <div className="App">
      <PlaylistsState>
        <SongsState>
          <UsersState>
            <CurrentPlaylistState>
              <Router>
                <Navbar />
                <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/lyricsLrcGenerator" element={<LyricsSynchronizer />}></Route>
                  <Route exact path="/AboutUs" element={<AboutPage />}></Route>
                  <Route exact path="/ContactPage" element={<ContactUsPage />}></Route>
                  <Route
                    exact
                    path="/musicplayer/:identifier"
                    element={<MusicPlayer />}
                  ></Route>
                  <Route
                    exact
                    path="/playlists/:playlistId"
                    element={<Playlists />}
                  ></Route>
                  <Route
                    exact
                    path="/signup"
                    element={<Signup />}
                  ></Route>
                    <Route
                    exact
                    path="/login"
                    element={<Login />}
                  ></Route>
                </Routes>
                <Footer />
              </Router>
            </CurrentPlaylistState>
          </UsersState>
        </SongsState>
      </PlaylistsState>
      
    </div>
  );
}

export default App;
