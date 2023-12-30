import React from "react";

export default function Playlists() {
  return (
    <>
      <div className="bg-gradient-to-b from-green-100 via-indigo-300 to-purple-500 flex items-center text-slate-800">
        <div className="border-4 border-purple-400 m-6 w-1/5 rounded-3xl drop-shadow-xl">
          <img
            className="rounded-2xl"
            src="./Assets/Legends-Never-Die/Legends-Never-Die-Photo.jpg"
            alt="Playlist-Image"
          />
        </div>
        <div className="flex  flex-col items-start">
          <p className="text-sm mb-2">Public Playlist</p>
          <h1 className="font-bold text-4xl">Melody Songs Playlist</h1>
          <div className="flex flex-row mt-1">
            <img
              className="rounded-full w-6"
              src="./Assets/Legends-Never-Die/Legends-Never-Die-Photo.jpg"
              alt="Artist"
            />
            &nbsp; *
            <p className="text-slate-900 text-sm mx-2">
              <a className="hover:underline" href="/">
                User Name
              </a>
            </p>
            *
            <p id="songCount" className="text-slate-900 text-sm mx-2">
              0 Songs
            </p>
            *
          </div>
        </div>
      </div>

      <div className="h-20 bg-gradient-to-b from-purple-500 to-purple-900 flex text-white justify-between px-10">
        <div className="text-3xl text-white flex flex-row items-center">
          <div className=" bg-green-500 rounded-full h-10 w-10 mr-6 border-black border-2 transition-transform transform hover:-translate-y-1 hover:shadow-md hover:shadow-[rgba(115,255,87)]">
            <button className="material-symbols-outlined  w-full h-full">
              play_arrow
            </button>
          </div>

          <div className="group relative inline-block shuffle">
            <span className="material-symbols-outlined rounded-full p-1 cursor-pointer m-2">
              shuffle
            </span>
            <span className="hidden group-hover:inline absolute -top-6 -left-10 bg-inherit text-white p-2 rounded text-xs whitespace-nowrap overflow-hidden">
              Click to shuffle the Playlist
            </span>
          </div>

          <div className="group relative inline-block">
            <span className="material-symbols-outlined rounded-full p-1 cursor-pointer m-2">
              favorite
            </span>
            <span className="hidden group-hover:inline absolute -top-6 -left-10 bg-inherit text-white p-2 rounded text-xs whitespace-nowrap overflow-hidden">
              Save to Your Library
            </span>
          </div>

          <div className="group relative inline-block">
            <span className="material-symbols-outlined rounded-full p-1 cursor-pointer m-2 download">
              download
            </span>
            <span className="hidden group-hover:inline absolute -top-6 -left-2 bg-inherit text-white p-2 rounded text-xs whitespace-nowrap overflow-hidden">
              Download
            </span>
          </div>
        </div>
        <div className="text-3xl text-white flex flex-row items-center">
          <div className="group relative inline-block">
            <span className="material-symbols-outlined rounded-full p-1 cursor-pointer m-2">
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
                  <th className="w-1/12 py-2 border-b border-gray-500">#</th>
                  <th className="w-4/12 py-2 border-b border-gray-500">
                    Title
                  </th>
                  <th className="w-3/12 py-2 border-b border-gray-500">
                    Artist
                  </th>
                  <th className="w-2/12 py-2 border-b border-gray-500">
                    <span className="material-symbols-outlined">schedule</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-bg-inherit hover:bg-purple-800 text-white cursor-pointer playlist-item">
                  <td className="w-1/12 py-2">1</td>
                  <td className="w-4/12 py-2">
                    <div className="music-title">Music 1</div>
                  </td>
                  <td className="w-3/12 py-2">
                    <div className="artist-name">Artist 1</div>
                  </td>
                  <td className="w-2/12 py-2">
                    <div className="music-time">0:00</div>
                  </td>
                </tr>
                <tr className="bg-bg-inherit hover:bg-purple-800 text-white cursor-pointer playlist-item">
                  <td className="w-1/12 py-2">2</td>
                  <td className="w-4/12 py-2">
                    <div className="music-title">Music 2</div>
                  </td>
                  <td className="w-3/12 py-2">
                    <div className="artist-name">Artist 2</div>
                  </td>
                  <td className="w-2/12 py-2">
                    <div className="music-time">0:00</div>
                  </td>
                </tr>
                <tr className="bg-bg-inherit hover:bg-purple-800 text-white cursor-pointer playlist-item">
                  <td className="w-1/12 py-2">3</td>
                  <td className="w-4/12 py-2">
                    <div className="music-title">Music 3</div>
                  </td>
                  <td className="w-3/12 py-2">
                    <div className="artist-name">Artist 3</div>
                  </td>
                  <td className="w-2/12 py-2">
                    <div className="music-time">0:00</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
