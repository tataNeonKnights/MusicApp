import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import SongsContext from "../Memory/SongsContext";

export default function SongsCards(props) {
  const { songs ,deleteSong} = useContext(SongsContext);

  // console.log("props", props.item);

  const handleDeleteButton = () => {
    deleteSong(songs[props.item].name)
  };
  return (
    <div className="border-2 border-gray-200 border-opacity-60 h-full w-1/5 m-2 flex-none transition-transform transform hover:scale-104 shadow-md hover:shadow-lg hover:brightness-90 cursor-pointer rounded-md overflow-hidden">
      <NavLink to={`/songs/${props.item}`}>
        <img
          className="lg:h-50 md:h-50 w-50 object-cover object-center rounded-lg"
          src="/Assets/Legends-Never-Die/Legends-Never-Die-Photo.jpg"
          alt="blog"
        />
        <div className="p-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {props.item ? songs[props.item].name : "default"}
          </h1>
          <p className="leading-relaxed mb-3">
            {props.item ? songs[props.item].description : "default"}
          </p>
        </div>
      </NavLink>
      <button
        className="p-2 m-6 bg-red-400 border-2 border-solid border-black rounded-lg"
        onClick={handleDeleteButton}
      >
        Delete
      </button>
    </div>
  );
}

SongsCards.defaultProps = {
  item: "",
};
