import React from "react";
import Cards from "./Cards";

export default function TrendingPlaylists() {
  return (
    // <!-- Trending Playlists -->
    <div className="flex flex-col py-12 justify-center items-start">
      <h2 className="px-5 m-2">Trending</h2>
      <div
        id="includeTrendingCardsLanding"
        className="text-gray-600 body-font container px-5 m-2 overflow-x-auto"
      >
        <Cards />
      </div>
    </div>
    // <!-- Trending Playlists -->
  );
}


{/* User Photo */}
{/* <div className="flex justify-center mt-4 w-3/5 relative">
<div className="container h-[200px] border-2 border-black rounded-sm overflow-hidden">
  <img
    className="w-full h-full object-cover"
    src={banner}
    alt="Banner"
  />
  <img
    className="rounded-full absolute z-10 top-1/2 transform -translate-y-1/2 left-1/2 transform -translate-x-1/2 h-[150px]"
    src={imgAdd}
    alt="UserPhoto"
  />
</div> */}
// </div>
{/* User Photo */}