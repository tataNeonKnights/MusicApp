import React from "react";
import Cards from "./Cards";

export default function PopularPlaylists() {
  
  return (
    // <!-- Popular Playlists -->
    <div className="flex flex-col py-12  justify-center items-start">
      <h2 className="px-5 m-2">Popular Release by artists</h2>
      <div
        id="includePopularCardsLanding"
        className="text-gray-600 body-font container px-5 m-2 overflow-x-auto"
      >
        <Cards />
      </div>
    </div>
    //  <!-- Popular Playlists -->
  );
}
