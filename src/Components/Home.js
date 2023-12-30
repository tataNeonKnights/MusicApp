import React from "react";
import HeroPage from "./HeroPage";
import NewMusicPlaylist from "./NewMusicPlaylist";
import TrendingPlaylists from "./TrendingPlaylists";
import ArtistsCardsHome from "./ArtistsCardsHome";
import PopularPlaylists from "./PopularPlaylists";

export default function Home() {
  return (
    <>
      <HeroPage />
      <NewMusicPlaylist />
      <TrendingPlaylists />
      <ArtistsCardsHome />
      <PopularPlaylists />
    </>
  );
}
