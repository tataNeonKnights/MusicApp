import React, { useContext } from "react";
import ArtistsCards from "./ArtistsCards";
import UsersContext from "../Memory/UsersContext";

export default function ArtistsCardsHome() {
  const { users } = useContext(UsersContext);

  try {
    return (
      // <!-- Artists  -->
      <div className="flex flex-col py-12  justify-center items-start">
        <h2 className="px-5 m-2">Artists</h2>
        <div
          id="includeArtistsCardsLanding"
          className="text-gray-600 body-font container px-5 m-2 overflow-x-auto"
        >
          <div className="flex">
            {Object.keys(users).map((item) => {
              return <ArtistsCards key={item} item={item} />;
            })}
          </div>
        </div>
      </div>
      // <!-- Artists  -->
    );
  } catch (error) {
    console.log("some error occured");
  }
}
