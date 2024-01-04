import React from "react";

export default function User() {
  const imgAdd =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

  const banner = "https://static.vecteezy.com/system/resources/thumbnails/001/234/358/small/modern-blue-halftone-banner-background.jpg";

  return (
    <div className="flex justify-center items-center flex-col w-full bg-black">
    {/* User Photo */}
      <div className="flex justify-center mt-4 w-3/5 relative">
        <div className="container h-[200px] border-2 border-black rounded-sm flex justify-center items-center backdrop-blur-3xl bg-white/30 overflow-hidden">
        <img
            className="w-full h-full object-cover"
            src={banner}
            alt="Banner"
          />
          <img
            className="rounded-full absolute z-10 top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 h-[150px]"
            src={imgAdd}
            alt="UserPhoto"
          />
        </div>
      </div>
      {/* User Photo */}

      {/* User Details */}
      <div className="flex flex-col items-center mt-4 backdrop-blur-xl bg-white/60 w-3/5 ">
        <div className="container border border-black border-b-0 rounded-sm text-left backdrop-blur-xl bg-white/30">
          <div className="font-bold text-xl w-full p-1">
            <span className="ml-2">User Details</span>
          </div>
        </div>
        <div className="container border border-black border-b-0 rounded-sm text-left">
          <div className="font-semibold text-xl w-full p-1">
            <span className="ml-2">User-Name: Akash</span>
          </div>
        </div>
        <div className="container border border-black border-b-0 rounded-sm text-left">
          <div className="font-semibold text-xl w-full p-1">
            <span className="ml-2">Email: akash@gmail.com</span>
          </div>
        </div>
        <div className="container border border-black border-b-0  rounded-sm text-left">
          <div className="font-semibold text-xl w-full p-1">
            <span className="ml-2">Password: ******</span>
          </div>
        </div>
        <div className="container border border-black rounded-sm text-left flex">
        <div className="edit icon w-1/10 text-left">
        {/* Add Edit Icon*/}
        </div>
          <button className="font-bold text-xl w-8/10 p-1 text-left">
            Update Details
          </button>
        </div>
      </div>
      {/* User Details */}

      {/* Playlist/Song Modification */}
      
      <div className="flex flex-col items-center mt-4 backdrop-blur-xl bg-white/60 w-3/5 mb-4">
        <div className="container border border-black border-b-0 rounded-sm text-left backdrop-blur-xl bg-white/30">
          <div className="font-bold text-xl w-full p-1">
            <span className="ml-2">Modify Playlist / Song</span>
          </div>
        </div>
        <div className="container border border-black border-b-0 rounded-sm text-left">
          <div className="font-semibold text-xl w-full p-1">
            <span className="ml-2">Modify Playlist</span>
          </div>
        </div>
        <div className="container border border-black rounded-sm text-left">
          <div className="font-semibold text-xl w-full p-1">
            <span className="ml-2">Modify Song</span>
          </div>
        </div>
      </div>
      {/* Playlist/Song Modification */}
    </div>
  );
}
