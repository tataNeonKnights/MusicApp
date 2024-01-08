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

import LyricsSynchronizer from "./Helpers/LyricsSynchronizer";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import DriveUploadHelper from "./Helpers/DriveUploadHelper";
import MediaDashBoard from "./Components/MediaDashBoard";
import Songs from "./Components/Songs";
import AddSong from "./Components/AddSong";

function App() {
  try {
    return (
      <div className="App">
        <PlaylistsState>
          <SongsState>
            <UsersState>
              <Router>
                <Navbar />
                <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/AddSong" element={<AddSong />}></Route>
                  <Route
                    exact
                    path="/Songs/:songId"
                    element={<Songs />}
                  ></Route>
                  <Route
                    exact
                    path="/MediaDashboard"
                    element={<MediaDashBoard />}
                  ></Route>
                  <Route
                    exact
                    path="/DriveUploadHelper"
                    element={<DriveUploadHelper />}
                  ></Route>
                  <Route
                    exact
                    path="/lyricsLrcGenerator"
                    element={<LyricsSynchronizer />}
                  ></Route>
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
                  <Route exact path="/signup" element={<Signup />}></Route>
                  <Route exact path="/login" element={<Login />}></Route>
                </Routes>
                <Footer />
              </Router>
            </UsersState>
          </SongsState>
        </PlaylistsState>
      </div>
    );
  } catch (error) {
    console.log("some error occured");
  }
}

export default App;
