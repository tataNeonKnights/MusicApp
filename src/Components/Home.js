import React from "react";
import HeroPage from "./HeroPage";
import NewMusicPlaylist from "./NewMusicPlaylist";
import TrendingPlaylists from "./TrendingPlaylists";
import ArtistsCardsHome from "./ArtistsCardsHome";
import PopularPlaylists from "./PopularPlaylists";

export default function Home() {
  return (
    <div className="container bg-gradient-to-b from-indigo-200 from-2% via-purple-500 via-10% to-black to-30%">
      <HeroPage />
      <NewMusicPlaylist />
      <TrendingPlaylists />
      <ArtistsCardsHome />
      <PopularPlaylists />
    </div>
  );
}
