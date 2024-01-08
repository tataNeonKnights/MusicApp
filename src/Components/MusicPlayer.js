import React, { useContext, useEffect, useState } from "react";
import NewMusicPlaylist from "./NewMusicPlaylist";
import TrendingPlaylists from "./TrendingPlaylists";
import ArtistsCardsHome from "./ArtistsCardsHome";
import PopularPlaylists from "./PopularPlaylists";
import { useParams } from "react-router-dom";
import SongsContext from "../Memory/SongsContext";

import CurrentPlaylistContext from "../Memory/CurrentPlaylistContext";

export default function MusicPlayer() {
  let audio; // Take the audio element

  let time; // Take the audio progress
  let btnPlay; // Take the play button
  let btnPause; // Take the pause button

  let currentTimeAudio; // Take the current audio time tracker element
  let totalTimeAudio; // Take the total duration audio time tracker element
  let audioTitle; // Take the audio title
  let audioImage; // Take the audio image

  // Initalized titles for the audio tracks

  //Created variable to track index and to check whether the audio is playing or not
  let track;
  let playing;
  let audioPlay;

  // const [playlist, setPlaylist] = useState([""]);
  let playlist;
  // console.log("playlist master data in music player : ", playlist);

  const { identifier } = useParams();
  // console.log("identifier", identifier);
  const { songs, getSongs } = useContext(SongsContext);

  // Added an event listener so that when the user presses spacebar audio starts playing or stops playing
  const handleSpaceUpEvent = (event) => {
    try {
      if (event.code === "Space" || event.key === " ") {
        if (playing === true) {
          handlePauseButton();
        } else {
          // console.log("clicked in space");
          handlePlayButton();
        }
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  // Created an event to fire when the user hits spacebar and to prevent default behaviour of spacebar which is to scroll the page
  const handleSpaceDownEvent = (event) => {
    try {
      if (event.code === "Space" || event.key === " ") {
        event.preventDefault();
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  // created a function to handle the switching of audio tracks.
  function switchTrack(numTrack, flag = "default") {
    try {
      // Change the src attribute value of the audio element to the target audio track.
      if (flag === "default") {
        handlePauseButton();
        audio.src = songs[playlist[numTrack]].audio;
        document.getElementById("karaokeOptionsInput").value = "normal";
        handleKaraokeButton();
        // console.log(audio.src);
        // Initilize the audio progress bar and audio
        audio.currentTime = 0;
        time.style.width = 0;

        // Play the song
        handlePlayButton();
      } else if (flag === "karaokeAudioChange") {
        handlePauseButton();
        audio.src = songs[playlist[numTrack]].bgm;
        handleKaraokeButton();
        // console.log(audio.src);
        // Initilize the audio progress bar and audio
        audio.currentTime = 0;
        time.style.width = 0;

        // Play the song
        handlePlayButton();
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  }

  //Added an event listener to toggle play and pause icons
  const handelPlayPause = () => {
    try {
      // console.log("play pause called");
      if (playing === true) {
        btnPlay.classList.add("hidden");
        btnPause.classList.remove("hidden");
      } else {
        btnPlay.classList.remove("hidden");
        btnPause.classList.add("hidden");
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  //Added an event listener on the play button to play the audio
  const handlePlayButton = async () => {
    try {
      //Setting the title with respect to the audio playing

      //Method to play the audio

      await audio.play();
      audioTitle.innerHTML = songs[playlist[track]].name;
      audioImage.src = songs[playlist[track]].image;
      playing = true;
      handelPlayPause();

      let LyricsKeyList = Object.keys(songs[playlist[track]].lyrics);
      let iterator = 0;
      // console.log(LyricsKeyList);

      LyricsKeyList.forEach((item) => {
        document.getElementById(item).style.backgroundColor = "white";
      });

      // Now we will set an interval when the audio is playing and will clear the interval when the audio is paused
      audioPlay = setInterval(function () {
        try {
          //Calculating and updating the current audio time tracker.
          // Get the value of what second the song is at.
          let currentAudioTime = Math.round(audio.currentTime);

          if (
            currentAudioTime > LyricsKeyList[iterator] &&
            iterator < LyricsKeyList.length
          ) {
            // console.log(
            //   "iterator : ",
            //   iterator,
            //   " current time  : ",
            //   currentAudioTime,
            //   " array time : ",
            //   LyricsKeyList[iterator]
            // );
            document.getElementById(
              LyricsKeyList[iterator]
            ).style.backgroundColor = "white";
            iterator++;
            // console.log(
            //   "Raza Offset : ",
            //   document.getElementById(LyricsKeyList[iterator]).offsetTop
            // );
            if (
              document.getElementById("LyricsKaraokeList").offsetHeight - 100 <
              document.getElementById(LyricsKeyList[iterator]).offsetTop
            ) {
              document.getElementById("LyricsKaraokeList").scrollTop =
                document.getElementById(LyricsKeyList[iterator]).offsetTop - 50;
            }

            // document.getElementById("LyricsKaraokeList").scrollTop =
            //   document.getElementById(LyricsKeyList[iterator]).offsetTop;
            if (iterator < LyricsKeyList.length)
              document.getElementById(
                LyricsKeyList[iterator]
              ).style.backgroundColor = "green";
          }

          //Calculate minutes
          let minutesCurrent = Math.floor(currentAudioTime / 60);
          // calculate seconds
          let secondsCurrent = currentAudioTime % 60;

          // if seconds is a single character add a "0" at the starting. eg :- 01,02,03...etc.
          if ((secondsCurrent + "").length < 2) {
            secondsCurrent = "0" + secondsCurrent;
          }
          //Now here we will update the current audio time tracker
          currentTimeAudio.innerHTML = minutesCurrent + ":" + secondsCurrent;

          //Here we are updating audio progress bar
          // Get the value of what second the song is at
          let audioTime = Math.round(audio.currentTime);
          // We get songs with different durations
          let audioLength = Math.round(audio.duration);
          // Assign a width to an element at time
          time.style.width = (audioTime * 100) / audioLength + "%";

          //Calculating and updating the total audio time tracker.
          // Get the total duration of the audio.
          let totalAudioTime = Math.round(audio.duration);
          //Calculate minutes
          let minutesTotal = Math.floor(totalAudioTime / 60);
          // calculate seconds
          let secondsTotal = totalAudioTime % 60;

          // if seconds is a single character add a "0" at the starting. eg :- 01,02,03...etc.
          if ((secondsTotal + "").length < 2) {
            secondsTotal = "0" + secondsTotal;
          }
          totalTimeAudio.innerHTML = minutesTotal + ":" + secondsTotal;

          // Compare what second the track is now and how long in total
          // And check that the track variable is less than three
          if (audioTime === audioLength && track < playlist.length - 1) {
            track++; // then Increase the variable
            switchTrack(track); // change track
            // Otherwise we check the same, but the track variable is greater than or equal to three
          } else if (
            audioTime === audioLength &&
            track >= playlist.length - 1
          ) {
            track = 0; // then we assign track to zero
            switchTrack(track); //Change track
          }
        } catch (error) {
          console.log("Some error fetching");
        }
      }, 10);
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  //Added an event listener on the pause button to pause the audio
  const handlePauseButton = () => {
    try {
      // console.log("clicked");
      audio.pause(); // Stops the song
      playing = false;
      handelPlayPause();
      clearInterval(audioPlay); // stops the interval
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  //Added an event listener on the prev button to go back on the playlist
  const handlePrevButton = () => {
    try {
      if (track > 0) {
        track--;
        switchTrack(track);
      } else {
        track = playlist.length - 1;
        switchTrack(track);
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  //Added an event listener on the next button to go forward on the playlist
  const handleNextButton = () => {
    try {
      if (track < playlist.length - 1) {
        track++;
        switchTrack(track);
      } else {
        track = 0;
        switchTrack(track);
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  //Added an event listener on the audio progress bar because when a user clicks on the progress bar it should reflect the relative progress
  const handleProgressClick = (event) => {
    try {
      // console.log(event.nativeEvent);

      let clickLocation = event.nativeEvent.offsetX;
      // console.log("click location : ", clickLocation);

      let widthTimeBar = (clickLocation * 100) / 720 + "%";
      time.style.width = widthTimeBar;

      let audioLength = Math.round(audio.duration);
      let temp = parseInt((clickLocation / 720) * audioLength);
      // console.log("temp : ", temp);
      audio.currentTime = temp;

      handlePlayButton();
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  const handleKaraokeButton = async (flag = "default") => {
    try {
      // console.log(flag);
      if (flag === "button") {
        document.querySelector(".audioImage").classList.toggle("invisible");
        document.getElementById("LyricsKaraoke").classList.toggle("invisible");
        document.getElementById("karaokeOptions").classList.toggle("invisible");
      }

      let lyricsElement = Object.keys(songs[playlist[track]].lyrics).map(
        (item) => {
          return `<li key=${item} id=${item}>${
            songs[playlist[track]].lyrics[item]
          } </li>`;
        }
      );
      // console.log(lyricsElement);
      let lyricsHTML = lyricsElement.join("");
      document.getElementById("LyricsKaraokeList").innerHTML = lyricsHTML;
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  const handelSelectedOptionsChange = (e) => {
    try {
      if (e.target.value === "normal") {
        switchTrack(track);
      } else if (e.target.value === "instrumental") {
        switchTrack(track, "karaokeAudioChange");
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  useEffect(() => {
    try {
      getSongs()
      playlist = localStorage.getItem("playlist").split(",");
      console.log("hi raza ", playlist);
      audio = document.getElementById("audio"); // Take the audio element
      // console.log("Mohiyaddeen raza audio : ", audio);
      time = document.querySelector(".timeBar"); // Take the audio progress
      btnPlay = document.querySelector(".play"); // Take the play button
      btnPause = document.querySelector(".pause"); // Take the pause button

      currentTimeAudio = document.querySelector(".currentTimeAudio"); // Take the current audio time tracker element
      totalTimeAudio = document.querySelector(".totalTimeAudio"); // Take the total duration audio time tracker element
      audioTitle = document.querySelector(".audioTitle"); // Take the audio title
      audioImage = document.querySelector(".audioImage"); // Take the audio image

      // Initalized titles for the audio tracks

      //Created variable to track index and to check whether the audio is playing or not
      playing = false;
      track = playlist.findIndex((ele) => ele === identifier);
      audio.src = songs[playlist[track]].audio;
      console.log("mohiyaddeen asd : ", audio.src);
      currentTimeAudio.innerHTML = "0:00";
      totalTimeAudio.innerHTML = songs[identifier].duration;
      // console.log("mohiyaddeen raza asd : ", playlist[track]);

      document.addEventListener("keydown", handleSpaceDownEvent);
      document.addEventListener("keyup", handleSpaceUpEvent);

      // Cleaning up the event listener on keydown and keyup
      return () => {
        document.removeEventListener("keydown", handleSpaceDownEvent);
        document.removeEventListener("keyup", handleSpaceUpEvent);
      };
    } catch (error) {
      console.log("Some error fetching");
    }
  }, []);
  let likeColor = true;
  const colorchange = () => {
    const likeInfo = document.getElementById("saveInfo");
    if (likeColor) {
      const favorite = document.getElementById("favorite");
      favorite.classList.remove("fa-regular", "fa-heart");
      favorite.classList.add("fa-solid");
      favorite.classList.add("fa-heart");
      favorite.classList.add("text-red-600");
      likeColor = false;
      // likeInfo.innerHTML="Remove from your library"
    } else {
      const favorite = document.getElementById("favorite");
      favorite.classList.remove("fa-solid", "fa-heart");
      favorite.classList.remove("text-red-600");
      favorite.classList.add("fa-regular");
      favorite.classList.add("fa-heart");
      // likeInfo.innerHTML="Save to your library"
      likeColor = true;
    }
  };
  try {
    return (
      <div className="">
        <div className="flex flex-col justify-center items-center py-12 ">
          {/* Audio Details */}
          <div className="audioDetails flex flex-col p-4 lg:w-1/2 sm:w-3/4 relative">
            <img
              className="lg:h-96 md:3/4 w-full object-cover object-right-top p-2 audioImage"
              src={songs[identifier].image}
              alt="blog"
            />
            <div
              className="lg:h-96 md:3/4 w-full object-cover object-right-top p-2 audioImage  absolute invisible"
              id="LyricsKaraoke"
            >
              <ul
                className="list-none overflow-y-auto h-full w-full"
                id="LyricsKaraokeList"
              >
                {Object.keys(songs[identifier].lyrics).map((item) => {
                  return (
                    <li key={item} id={item}>
                      {songs[identifier].lyrics[item]}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <div className="audioTitle p-2 ">{songs[identifier].name}</div>

              <div className="flex flex-row">
                {/* Hamburger Menu with Dropdown List */}
                <div className="dropdown inline-block  mr-1 relative">
                  <button className="hamburger material-icons text-gray-600">
                    menu
                  </button>
                  <div className="dropdown-content top-4 right-0 absolute bg-white border shadow-md mt-2 py-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Item 1
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Item 2
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Item 3
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Audio Details */}

          {/* Audio Element */}
          <audio id="audio" src=""></audio>

          {/* Audio Element */}

          {/* Controls */}
          <div id="controls">
            {/* Audio Time Tracker */}
            <div className="timeTracker flex justify-between">
              <div className="currentTimeAudio">1</div>
              <div className="totalTimeAudio">2</div>
            </div>
            {/* Audio Time Tracker */}

            {/* Progress Bar */}
            <div
              className="audio-track w-[720px] h-[10px] bg-gray-500 cursor-pointer "
              onClick={handleProgressClick}
            >
              <div className="timeBar w-[0px] h-[10px] bg-green-700"></div>
            </div>
            {/* Progress Bar */}

            {/* Button controls */}
            <div className="buttonControls flex justify-between items-center h-[5vh]">
              {/* Volume Up Button */}
              <button className="material-symbols-outlined w-10">
                volume_up
              </button>
              <div className="buttonMainControls flex w-full justify-center">
                <button className="material-symbols-outlined w-10">
                  shuffle
                </button>
                <button
                  className="prev  material-symbols-outlined w-10"
                  onClick={handlePrevButton}
                >
                  skip_previous
                </button>
                <div
                  className="play_pause flex justify-center items-center transition-opacity duration-500 ease-in-out w-10"
                  onClick={handelPlayPause}
                >
                  <button
                    className="play material-symbols-outlined  "
                    onClick={handlePlayButton}
                  >
                    play_arrow
                  </button>
                  <button
                    className="pause material-symbols-outlined hidden   "
                    onClick={handlePauseButton}
                  >
                    pause
                  </button>
                </div>
                <button
                  className="next material-symbols-outlined w-10"
                  onClick={handleNextButton}
                >
                  skip_next
                </button>
                {/* Loop Button */}
                <button className="material-symbols-outlined w-10">laps</button>
              </div>
              {/* Karaoke Button */}

              <div
                className="relative inline-block text-left invisible cursor-pointer"
                id="karaokeOptions"
              >
                <select
                  className="right-0 z-10 mt-2 w-32  shadow-md ring-1  ring-opacity-5 focus:outline-none  inline-flex  justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900  ring-inset  ring-gray-300 hover:bg-gray-50 cursor-pointer"
                  id="karaokeOptionsInput"
                  defaultValue={"normal"}
                  onChange={handelSelectedOptionsChange}
                >
                  <option
                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                    id="menu-item-0"
                    value={"normal"}
                  >
                    Normal
                  </option>
                  <option
                    className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                    id="menu-item-1"
                    value={"instrumental"}
                  >
                    Instrumental
                  </option>
                </select>
              </div>

              <button
                className="karaoke material-icons w-10"
                onClick={() => handleKaraokeButton("button")}
              >
                mic
              </button>

              {/* Like Button */}
              <div className="group relative inline-block">
                <button onClick={colorchange} className="w-10 cursor-pointer ">
                  <i
                    id="favorite"
                    className="fa-regular fa-heart transition-all  m-1 hover:text-3xl text-2xl hover:mt-1 hover:text-red-500 hover:mb-0.5"
                  ></i>
                </button>
              </div>
            </div>
            {/* Button controls */}
          </div>
          {/* {/* Controls */}
        </div>
        <NewMusicPlaylist />
        <TrendingPlaylists />
        <ArtistsCardsHome />
        <PopularPlaylists />
      </div>
    );
  } catch (error) {
    console.log("some error occured");
  }
}
