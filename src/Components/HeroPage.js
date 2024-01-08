import React from "react";

export default function HeroPage() {
  try {
    return (
      <div
        id="heroPage"
        className="h-72 py-12 [100vw] bg-green-700 flex justify-center items-center text-white overflow-hidden text-xl"
      >
        MusicApp
      </div>
    );
  } catch (error) {
    console.log("some error occured");
  }
}
