import React, { useContext } from "react";
import UsersContext from "../Memory/UsersContext";

export default function ArtistsCards(props) {
  const {users} = useContext(UsersContext)
  return (
    // {/* Artists cards imported by tailBlocks and made many changes to meet our desired output*/}

    // {/* {/* Artists card-1 */}
    // {/* Added transition, trnasform and hover effect to each card */}
    <div className="border-2 border-gray-200 border-opacity-60 h-full w-1/5 m-2 flex-none transition-transform transform hover:scale-104 shadow-md hover:shadow-lg hover:brightness-90 cursor-pointer rounded-md overflow-hidden">
      <img
        className="lg:h-50 md:h-32 w-32 my-5 object-cover object-center border-2 rounded-full mx-auto"
        src="/Assets/Legends-Never-Die/Legends-Never-Die-Photo.jpg"
        alt="blog"
      />
      <div className="p-6">
        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
          {users[props.item].name}
        </h1>
        <p className="leading-relaxed mb-3">
          Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
          microdosing tousled waistcoat.
        </p>
      </div>
    </div>
    // {/* Artists card-1 */}
  );
}
