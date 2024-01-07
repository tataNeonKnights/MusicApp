import React, { useState } from "react";
import PlaylistsContext from "./PlaylistsContext";

const PlaylistsState = ({ children }) => {
  const [userPlaylists, setUserPlaylists] = useState({});
  const [playlists, setPlaylists] = useState({
    "playlist-1": {
      name: "playlist 1",
      user: 1, //user id
      songs: ["song-1", "song-2", "song-3"], //song ids
      image: "link",
      description: "desc1",
    },
    "playlist-2": {
      name: "playlist 2",
      user: 2, //user id
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

  const loadUserPlaylists = () => {
    try {
      let userPlaylistsStore = Object.keys(playlists).filter((item) => {
        if (playlists[item].user === 1) return item;
      });

      let userPlaylistsStoreObject = {};

      userPlaylistsStore.forEach((item) => {
        userPlaylistsStoreObject[item] = playlists[item];
      });

      console.log(userPlaylistsStoreObject);
      setUserPlaylists(userPlaylistsStoreObject);
    } catch (error) {
      console.log("some error occured");
    }
  };

  return (
    <PlaylistsContext.Provider
      value={{ playlists, userPlaylists, setUserPlaylists,loadUserPlaylists }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export default PlaylistsState;
