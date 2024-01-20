import React, { useContext, useEffect, useState } from "react";
import PlaylistsContext from "../Memory/PlaylistsContext";
import SongsContext from "../Memory/SongsContext";
import UsersContext from "../Memory/UsersContext";
import { NavLink, useParams } from "react-router-dom";
import NewMusicPlaylist from "./NewMusicPlaylist";
import NewSongs from "./NewSongs";

export default function MediaDashBoard() {
  const { playlists, userPlaylists, loadUserPlaylists } =
    useContext(PlaylistsContext);
    // useContext(SongsContext)
  const { playlistId } = useParams();
  const { songs, loadUserSongs, userSongs } = useContext(SongsContext);
  const { users } = useContext(UsersContext);

  useEffect(() => {
    loadUserPlaylists();
    loadUserSongs();
    // console.log("hi",playlists)
  }, [songs]);

  try {
    return (
      <div>
        <div className="controlsMaster flex items-center justify-center">
          <NavLink to={"/addsong"}>
            <button className="p-2 m-6 bg-green-400 border-2 border-solid border-black rounded-lg">
              Add Song
            </button>
          </NavLink>
        </div>
        <NewMusicPlaylist flag="custom" />
        <div id="deleteInfo" className="text-3xl text-red-500"></div>
        <NewSongs flag="custom" />
      </div>
    );
  } catch (error) {
    console.log("some error occured");
  }
}
