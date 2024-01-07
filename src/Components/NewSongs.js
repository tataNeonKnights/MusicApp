import React, { useContext } from "react";
import SongsContext from "../Memory/SongsContext";
import SongsCards from "./SongsCards";

export default function NewSongs(props) {
  const { songs, userSongs } = useContext(SongsContext);

  return (
    <div className="flex flex-col py-12 justify-center items-start">
      <h2 className="px-5 m-2">
        {props.flag === "custom" ? "Your Songs" : "New Songs"}
      </h2>
      <div
        id="includeNewMusicCardsLanding"
        className="text-gray-600 body-font container px-5 m-2 overflow-x-auto"
      >
        <div className="flex">
          {props.flag === "custom"
            ? Object.keys(userSongs).map((item) => {
                return <SongsCards key={item} item={item} />;
              })
            : Object.keys(songs).map((item) => {
                return <SongsCards key={item} item={item} />;
              })}
        </div>
      </div>
    </div>
  );
}
