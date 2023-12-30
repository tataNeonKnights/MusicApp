import React from "react";
import Cards from "./Cards";

export default function NewMusicPlaylist() {
  return (
    <div className="flex flex-col py-12 justify-center items-start text-slate-300">
      <h2 className="px-5 m-2 text-2xl">New music playlists</h2>
      <div
        id="includeNewMusicCardsLanding"
        className="text-gray-300 body-font container px-5 mx-auto overflow-x-auto"
      >
        <Cards />
      </div>
    </div>
  );
}
