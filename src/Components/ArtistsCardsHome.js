import React from "react";
import ArtistsCards from "./ArtistsCards";

export default function ArtistsCardsHome() {
  return (
    // <!-- Artists  -->
    <div className="flex flex-col py-12  justify-center items-start">
      <h2 className="px-5 m-2">Artists</h2>
      <div
        id="includeArtistsCardsLanding"
        className="text-gray-600 body-font container px-5 mx-auto overflow-x-auto"
      >
        <ArtistsCards />
      </div>
    </div>
    // <!-- Artists  -->
  );
}
