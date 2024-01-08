import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import PlaylistsContext from "../Memory/PlaylistsContext";
import SongsContext from "../Memory/SongsContext";
import UsersContext from "../Memory/UsersContext";
import CurrentPlaylistContext from "../Memory/CurrentPlaylistContext";

export default function Songs() {
  let likeColor = true;
  const { playlists } = useContext(PlaylistsContext);
  const { songId } = useParams();
  const { songs,getSongs } = useContext(SongsContext);
  const { users } = useContext(UsersContext);
  // console.log(songs);

  // const { playlist, setPlaylist } = useContext(CurrentPlaylistContext);
  const [searchSongName, setSearchSongName] = useState("");
  const [searchOpens, setSearchOpens] = useState(false);

  useEffect(() => {
    console.log("hi")
    let playlistData = [songId];
    // console.log("playlist master data : ",playlistData)
    // setPlaylist(playlistData);
    localStorage.clear()
    localStorage.setItem("playlist",playlistData.toString())
  }, [songId]);

  const colorchange = () => {
    const likeInfo = document.getElementById("saveInfo");
    if (likeColor) {
      const favorite = document.getElementById("favorite");
      favorite.classList.remove("fa-regular", "fa-heart");
      favorite.classList.add("fa-solid");
      favorite.classList.add("fa-heart");
      favorite.classList.add("text-red-600");
      likeColor = false;
      likeInfo.innerHTML = "Remove from your library";
    } else {
      const favorite = document.getElementById("favorite");
      favorite.classList.remove("fa-solid", "fa-heart");
      favorite.classList.remove("text-red-600");
      favorite.classList.add("fa-regular");
      favorite.classList.add("fa-heart");
      likeInfo.innerHTML = "Save to your library";
      likeColor = true;
    }
  };

  const handleOnChange = (e) => {
    setSearchSongName(e.target.value);
  };

  const searchSize = () => {
    if (searchOpens === false) {
      const searchBox = document.getElementById("playlistSearch");
      searchBox.classList.remove("w-6");
      searchBox.classList.add("w-40");
      searchBox.classList.remove("hidden");
      setSearchOpens(true);
    } else if (searchOpens === true && searchSongName.length > 0) {
      console.log("Searching in the database");
    } else {
      const searchBox = document.getElementById("playlistSearch");
      searchBox.classList.remove("w-40");
      searchBox.classList.add("w-6");
      searchBox.classList.add("hidden");
      setSearchOpens(false);
    }
  };

  try {
    return (
      <>
        <div className="bg-gradient-to-b from-green-100 via-indigo-300 to-purple-500 flex items-center text-slate-800">
          <div className="border-4 border-purple-400 m-6 w-1/5 rounded-3xl drop-shadow-xl">
            <img
              className="rounded-2xl"
              src="/Assets/Legends-Never-Die/Legends-Never-Die-Photo.jpg"
              alt="Playlist-Image"
            />
          </div>
          <div className="flex  flex-col items-start">
            <p className="text-sm mb-2">Public Playlist</p>
            <h1 className="font-bold text-4xl">{songs[songId].name}</h1>
            <div className="flex flex-row mt-1">
              <img
                className="rounded-full w-6"
                src="/Assets/Legends-Never-Die/Legends-Never-Die-Photo.jpg"
                alt="Artist"
              />
              &nbsp;*
              <p className="text-slate-900 text-sm mx-2">
                <a className="hover:underline" href="#">
                  {users[songs[songId].user].name}
                </a>
              </p>
              *
            </div>
          </div>
        </div>

        <div className="h-20 bg-gradient-to-b from-purple-500 to-purple-900 flex text-white justify-between px-10">
          <div className="text-3xl text-white flex flex-row items-center">
            <div className=" bg-green-500 rounded-full h-10 w-10 mr-6 border-black border-2 transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-[rgba(115,255,87)]">
              <button className="material-symbols-outlined  w-full h-full ">
                play_arrow
              </button>
            </div>

            <div className=" relative inline-block shuffle">
              <span className="peer material-symbols-outlined rounded-full cursor-pointer m-2 hover:text-3xl hover:mt-0.5 w-10 hover:text-green-500 hover:mb-0.5">
                shuffle
              </span>
              <span className="hidden peer-hover:inline absolute -top-6 -left-10 bg-inherit text-white p-2 rounded text-xs whitespace-nowrap overflow-hidden ">
                Click to shuffle the Playlist
              </span>
            </div>

            <div className="group relative inline-block">
              <button onClick={colorchange} className="w-10 cursor-pointer">
                <i
                  id="favorite"
                  className="peer fa-regular fa-heart  m-1 favorite hover:text-3xl text-2xl hover:mt-1 hover:text-red-500 hover:mb-0.5 transition-all"
                ></i>
                <span
                  id="saveInfo"
                  className="hidden peer-hover:inline absolute -top-7 -left-10 bg-inherit text-white p-2 rounded text-xs whitespace-nowrap overflow-hidden"
                >
                  Save to Your Library
                </span>
              </button>
              <span
                id="saveInfo"
                className="hidden peer-hover:inline absolute -top-7 -left-10 bg-inherit text-white p-2 rounded text-xs whitespace-nowrap overflow-hidden"
              >
                Save to Your Library
              </span>
            </div>

            <div className="group relative inline-block">
              <span className="peer material-symbols-outlined rounded-full p-1 cursor-pointer m-2 download hover:text-3xl hover:mt-0.5 w-10 hover:text-green-500 hover:mb-0.5">
                download
              </span>
              <span className="hidden peer-hover:inline absolute -top-6 -left-2 bg-inherit text-white p-2 rounded text-xs whitespace-nowrap overflow-hidden">
                Download
              </span>
            </div>
          </div>
          <div className="text-3xl text-white flex flex-row items-center">
            <input
              type="text"
              id="playlistSearch"
              name="name"
              className=" bg-white opacity-70 h-9 w-6 hidden rounded-3xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 ease-in-out "
              placeholder="Enter songs name"
              value={searchSongName}
              onChange={(e) => handleOnChange(e)}
            />

            <div className="group relative inline-block">
              <span
                className="select-none material-symbols-outlined rounded-full p-1 cursor-pointer m-2"
                id="playlistSearchBar"
                onClick={searchSize}
              >
                search
              </span>
              <span className="hidden group-hover:inline absolute -top-6 -left-8 bg-inherit text-white p-2 rounded text-xs whitespace-nowrap overflow-hidden">
                Search in PlayList
              </span>
            </div>

            <label className="text-sm m-2" htmlFor="options">
              Sort by:
            </label>

            <select
              id="options"
              className="h-6 w-auto bg-transparent text-sm  border border-white cursor-pointer"
              name="options"
            >
              <option defaultValue="volvo" className="text-xs bg-slate-700 ">
                Custom Order
              </option>
              <option value="saab" className="text-xs bg-slate-700 ">
                Title
              </option>
              <option value="mercedes" className="text-xs bg-slate-700 ">
                Artist
              </option>
              <option value="audi" className="text-xs bg-slate-700 ">
                Duration
              </option>
            </select>
          </div>
        </div>

        <section className="text-gray-600 body-font bg-gradient-to-b from-purple-900 from-20% to-black to-90%">
          <div className="container px-5 py-24 mx-auto">
            <div className="w-5/6 block mx-auto">
              <table className="w-full mx-auto table-fixed text-left">
                <thead>
                  <tr className="bg-inherit text-white">
                    <th className="w-1/4 py-2 border-b border-gray-500">#</th>
                    <th className="w-1/4 py-2 border-b border-gray-500">
                      Title
                    </th>
                    <th className="w-1/4 py-2 border-b border-gray-500">
                      Artist
                    </th>
                    <th className="w-1/4 py-2 border-b border-gray-500">
                      <span className="material-symbols-outlined">
                        schedule
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="bg-bg-inherit hover:bg-purple-800 text-white cursor-pointer playlist-item">
                    <td className="w-1/12">
                      <NavLink
                        to={`/musicplayer/${songId}`}
                        className="w-full block  py-2"
                      >
                        1
                      </NavLink>
                    </td>
                    <td className="w-4/12">
                      <NavLink
                        to={`/musicplayer/${songId}`}
                        className="music-title w-full block py-2"
                      >
                        {songs[songId].name}
                      </NavLink>
                    </td>
                    <td className="w-3/12 ">
                      <NavLink
                        to={`/musicplayer/${songId}`}
                        className="artist-name w-full block py-2"
                      >
                        {songs[songId].name}
                      </NavLink>
                    </td>
                    <td className="w-2/12 ">
                      <NavLink
                        to={`/musicplayer/${songId}`}
                        className="music-time w-full block py-2"
                      >
                        {songs[songId].duration}
                      </NavLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.log("some error occured");
  }
}
