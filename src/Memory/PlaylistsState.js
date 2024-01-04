import React, { useState } from "react";
import PlaylistsContext from "./PlaylistsContext";

const PlaylistsState = ({ children }) => {
  const [playlists, setPlaylists] = useState({
    "playlist-1": {
      name: "playlist 1",
      user: 1, //user id
      songs: ["song-1", "song-2", "song-3"],
      image: "link",
      description: "desc1",
    },
    "playlist-2": {
      name: "playlist 2",
      user: 1, //user id
      songs: ["song-1"],
      image: "link",
      description: "desc2",
    },
    "playlist-3": {
      name: "playlist 3",
      user: 1, //user id
      songs: ["song-1", "song-2"],
      image: "link",
      description: "desc3",
    },
  });

  return (
    <PlaylistsContext.Provider value={{ playlists }}>
      {children}
    </PlaylistsContext.Provider>
  );
};

export default PlaylistsState;
