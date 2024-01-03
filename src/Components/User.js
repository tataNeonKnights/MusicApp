import React from "react";

export default function User() {
  const imgAdd =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

  return (
    <>
    {/* User Photo */}
      <div className="flex justify-center mt-4">
        <div className="container w-3/5 h-[200px] border-2 border-black rounded-sm flex justify-center items-center">
          <img
            className="rounded-full h-[150px] z-10"
            src={imgAdd}
            alt="UserPhoto"
          />
        </div>
      </div>
      {/* User Photo */}

      {/* User Details */}
      <div className="flex flex-col items-center mt-4">
        <div className="container w-3/5 border-2 border-black border-b-0 rounded-sm text-left">
          <div className="font-bold text-xl bg-slate-400 w-full p-1">
            <span className="ml-2">User Details</span>
          </div>
        </div>
        <div className="container w-3/5 border-2 border-black border-b-0 rounded-sm text-left">
          <div className="font-bold text-xl bg-slate-200 w-full p-1">
            <span className="ml-2">User-Name: Akash</span>
          </div>
        </div>
        <div className="container w-3/5 border-2 border-black border-b-0 rounded-sm text-left">
          <div className="font-bold text-xl bg-slate-200 w-full p-1">
            <span className="ml-2">Email: akash@gmail.com</span>
          </div>
        </div>
        <div className="container w-3/5 border-2 border-black border-b-0  rounded-sm text-left">
          <div className="font-bold text-xl bg-slate-200 w-full p-1">
            <span className="ml-2">Password: ******</span>
          </div>
        </div>
        <div className="container w-3/5 border-2 border-black rounded-sm text-left">
          <button className="font-bold text-xl bg-slate-700 w-full p-1 text-center">
            Update Details
          </button>
        </div>
      </div>
      {/* User Details */}

      {/* Playlist/Song Modification */}
      <div className="flex flex-col items-center my-4">
        <div className="container w-3/5 border-2 border-black border-b-0 rounded-sm text-left">
          <div className="font-bold text-xl bg-slate-400 w-full p-1">
            <span className="ml-2">Modify Playlist / Song</span>
          </div>
        </div>
        <div className="container w-3/5 border-2 border-black border-b-0 rounded-sm text-left">
          <div className="font-bold text-xl bg-slate-200 w-full p-1">
            <span className="ml-2">Modify Playlist</span>
          </div>
        </div>
        <div className="container w-3/5 border-2 border-black rounded-sm text-left">
          <div className="font-bold text-xl bg-slate-200 w-full p-1">
            <span className="ml-2">Modify Song</span>
          </div>
        </div>
      </div>
      {/* Playlist/Song Modification */}
    </>
  );
}
