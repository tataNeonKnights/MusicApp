import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import PlaylistsContext from "../Memory/PlaylistsContext";

export default function Cards(props) {
  const { playlists } = useContext(PlaylistsContext);
  // console.log("props", props.item);
  try {
    return (
      // {/* Playlists cards imported by tailBlocks and made many changes to meet our desired output*/}

      // {/* {/* Playlists card-1 */}
      // {/* Added transition, trnasform and hover effect to the code in each card */}

      <div className="border-2 border-gray-200 border-opacity-60 h-full w-1/5 m-2 flex-none transition-transform transform hover:scale-104 shadow-md hover:shadow-lg hover:brightness-90 cursor-pointer rounded-md overflow-hidden">
        <NavLink to={`/playlists/${props.item}`}>
          <img
            className="lg:h-50 md:h-50 w-50 object-cover object-center rounded-lg"
            src="/Assets/Legends-Never-Die/Legends-Never-Die-Photo.jpg"
            alt="blog"
          />
          <div className="p-6">
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {props.item ? playlists[props.item].name : "default"}
            </h1>
            <p className="leading-relaxed mb-3">
              {props.item ? playlists[props.item].description : "default"}
            </p>
          </div>
        </NavLink>
      </div>

      // {/* Playlists card-1 */}
    );
  } catch (error) {
    console.log("some error occured");
  }
}

Cards.defaultProps = {
  item: "",
};
