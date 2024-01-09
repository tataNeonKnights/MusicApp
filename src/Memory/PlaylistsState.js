import React, { useEffect, useState } from "react";
import PlaylistsContext from "./PlaylistsContext";

const PlaylistsState = ({ children }) => {
  const [userPlaylists, setUserPlaylists] = useState({});
  // const [playlists, setPlaylists] = useState({
  //   "playlist-1": {
  //     name: "playlist 1",
  //     user: 1, //user id
  //     songs: ["song-1", "song-2", "song-3"], //song ids
  //     image: "link",
  //     description: "desc1",
  //   },
  //   "playlist-2": {
  //     name: "playlist 2",
  //     user: 2, //user id
  //     songs: ["song-1"],
  //     image: "link",
  //     description: "desc2",
  //   },
  //   "playlist-3": {
  //     name: "playlist 3",
  //     user: 1, //user id
  //     songs: ["song-1", "song-2"],
  //     image: "link",
  //     description: "desc3",
  //   },
  // });

  const [playlists, setPlaylists] = useState({});

  const getPlaylists = async () => {
    console.log("get");
    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/getplaylists",
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          // headers: {
          //   "auth-token": localStorage.getItem("token"),
          // },

          // body: JSON.stringify(data), // body data type must match "Content-Type" header
        }
      );
      if (response.ok) {
        const data = await response.json(); // parses JSON response into native JavaScript objects

        let playlistsMasterData = {};
        data.forEach((item) => {
          item.songsList.forEach((element, index) => {
            item.songsList[index] = element.songId;
          });
          // console.log("raza ", item.songsList);

          playlistsMasterData[item.playlistCustomId] = {
            name: item.pName,
            user: item.user.id,
            image: item.pImageSrc,
            description: item.pDesc,
            playlistCustomId: item.playlistCustomId,
            songs: item.songsList,
          };
        });
        // console.log("mohiyaddeen ", playlistsMasterData);
        // console.log("raza",data)
        setPlaylists(playlistsMasterData);
      }
    } catch (error) {
      return error.message;
    }
  };

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

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <PlaylistsContext.Provider
      value={{ playlists, userPlaylists, setUserPlaylists, loadUserPlaylists }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
};

export default PlaylistsState;
