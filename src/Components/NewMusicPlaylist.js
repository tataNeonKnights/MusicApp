import React, { useContext } from "react";
import Cards from "./Cards";
import PlaylistsContext from "../Memory/PlaylistsContext";

export default function NewMusicPlaylist() {
  const { playlists } = useContext(PlaylistsContext);

  return (
    <div className="flex flex-col py-12 justify-center items-start">
      <h2 className="px-5 m-2">New music playlists</h2>
      <div
        id="includeNewMusicCardsLanding"
        className="text-gray-600 body-font container px-5 m-2 overflow-x-auto"
      >
        <div className="flex">
          {Object.keys(playlists).map((item) => {
            return <Cards key={item} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
