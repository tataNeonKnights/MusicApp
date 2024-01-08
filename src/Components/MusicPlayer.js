import React, { useContext, useEffect, useRef, useState } from "react";
import NewMusicPlaylist from "./NewMusicPlaylist";
import TrendingPlaylists from "./TrendingPlaylists";
import ArtistsCardsHome from "./ArtistsCardsHome";
import PopularPlaylists from "./PopularPlaylists";
import { useParams } from "react-router-dom";
import SongsContext from "../Memory/SongsContext";

export default function MusicPlayer() {
  // We Are Using useRef Hooks For DOM Monipaulations As Direct DOM Mainpulation Will Cause Unexpected Behaviours
  const audioRef = useRef(null);

  const timeRef = useRef(null);

  const btnPlayRef = useRef(null);

  const btnPauseRef = useRef(null);

  const currentTimeAudioRef = useRef(null);

  const totalTimeAudioRef = useRef(null);

  const audioTitleRef = useRef(null);

  const audioImageRef = useRef(null);

  const lyricsKaraokeListRef = useRef(null);

  const karaokeOptionsInputRef = useRef(null);

  const karaokeOptionsRef = useRef(null);

  const lyricsKaraokeRef = useRef(null);

  // Retreiving queuePlalist from localstorage - we will be storing queuePlalist to localstorage to persist the data
  let playlist = localStorage.getItem("playlist").split(",");
  // console.log("playlist master data in music player : ", playlist);

  // Parameter in the endpoint
  const { identifier } = useParams();
  // console.log("identifier", identifier);

  // State variable for keep tracking of whether the audio is playing or not
  const [playing, setPlaying] = useState(false);
  // let playing;

  // SetInterval tracker for when the audio plays
  let audioPlay;

  const { songs, getSongs } = useContext(SongsContext);

  // Method to handle when the user presses spacebar audio starts playing or stops playing
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

  //Method to handle when the user hits spacebar and to prevent default behaviour of spacebar which is to scroll the page
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
      // default is when the Iterface is on normal mode and not in KARAOKE mode
      if (flag === "default") {
        // Pause the song
        handlePauseButton();
        audioRef.current.src = songs[playlist[numTrack]].audio;
        // console.log(audioRef.current.src);

        karaokeOptionsInputRef.current.value = "normal";
        handleKaraokeButton();

        // Initilize the audio progress bar and audio
        audioRef.current.currentTime = 0;
        timeRef.current.style.width = 0;

        // Play the song
        handlePlayButton();
      } else if (flag === "karaokeAudioChange") {
        // Pause the song
        handlePauseButton();
        audioRef.current.src = songs[playlist[numTrack]].bgm;
        // console.log(audioRef.current.src);
        handleKaraokeButton();

        // Initilize the audio progress bar and audio
        audioRef.current.currentTime = 0;
        timeRef.current.style.width = 0;

        // Play the song
        handlePlayButton();
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  }

  //Method to handle toggle play and pause icons
  const handelPlayPause = (playingParam) => {
    try {
      // console.log("play pause called");
      if (playingParam === true) {
        btnPlayRef.current.classList.add("hidden");
        btnPauseRef.current.classList.remove("hidden");
      } else {
        btnPlayRef.current.classList.remove("hidden");
        btnPauseRef.current.classList.add("hidden");
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  //Method to handle the playing of audio
  const handlePlayButton = async () => {
    try {
      // Retreiving track index from localstorage
      let track = parseInt(localStorage.getItem("track"));

      //play the audio
      await audioRef.current.play();

      //Setting the title and image with respect to the audio playing
      audioTitleRef.current.innerHTML = songs[playlist[track]].name;
      audioImageRef.current.src = songs[playlist[track]].image;

      // Toggling the icons for play pause
      handelPlayPause(true);
      setPlaying(true);

      // Logic For Lyrics Synchronization
      // Retreiving all the keys from the lyrics object which are in seconds
      let LyricsKeyList = Object.keys(songs[playlist[track]].lyrics);
      // console.log(LyricsKeyList);
      let iterator = 0;

      // Resetting the UI
      LyricsKeyList.forEach((item) => {
        document.getElementById(item).style.backgroundColor = "white";
      });

      // Now we will set an interval when the audio is playing and will clear the interval when the audio is paused
      audioPlay = setInterval(function () {
        try {
          //Calculating and updating the current audio time tracker.
          // Get the value of what second the song is at.
          let currentAudioTime = Math.round(audioRef.current.currentTime);

          // Logic for synchronising lyrics with audio's current time
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
              lyricsKaraokeListRef.current.offsetHeight - 100 <
              document.getElementById(LyricsKeyList[iterator]).offsetTop
            ) {
              lyricsKaraokeListRef.current.scrollTop =
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
          currentTimeAudioRef.current.innerHTML =
            minutesCurrent + ":" + secondsCurrent;

          //Here we are updating audio progress bar
          // Get the value of what second the song is at
          let audioTime = Math.round(audioRef.current.currentTime);
          // We get songs with different durations
          let audioLength = Math.round(audioRef.current.duration);
          // Assign a width to an element at time
          timeRef.current.style.width = (audioTime * 100) / audioLength + "%";

          // Compare what second the track is now and how long in total
          // And check that the track variable is less than the queue playlist length
          if (audioTime === audioLength && track < playlist.length - 1) {
            // then Increase the variable
            localStorage.setItem("track", (track + 1).toString());
            switchTrack(track + 1); // change track
            // Otherwise we check the same, but the track variable is greater than or equal to queue playlist length
          } else if (
            audioTime === audioLength &&
            track >= playlist.length - 1
          ) {
            // then we assign track to zero
            localStorage.setItem("track", (0).toString());
            switchTrack(0); //Change track
          }
        } catch (error) {
          console.log(error);
        }
      }, 10);
    } catch (error) {
      console.log(error);
    }
  };

  //Method to handle pause button to pause the audio
  const handlePauseButton = () => {
    try {
      // console.log("clicked");
      audioRef.current.pause(); // Stops the song
      handelPlayPause(false);
      setPlaying(false);
      clearInterval(audioPlay); // stops the interval
    } catch (error) {
      console.log(error);
    }
  };

  //Method to handle prev button to go back on the playlist
  const handlePrevButton = () => {
    try {
      let track = parseInt(localStorage.getItem("track"));
      if (track > 0) {
        localStorage.setItem("track", (track - 1).toString());
        switchTrack(track - 1);
      } else {
        localStorage.setItem("track", (playlist.length - 1).toString());
        switchTrack(playlist.length - 1);
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  //Method to handle next button to go forward on the playlist
  const handleNextButton = () => {
    try {
      let track = parseInt(localStorage.getItem("track"));
      if (track < playlist.length - 1) {
        localStorage.setItem("track", (track + 1).toString());
        switchTrack(track + 1);
      } else {
        localStorage.setItem("track", (0).toString());
        switchTrack(0);
      }
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  //Method to handle audio progress bar because when a user clicks on the progress bar it should reflect the relative progress
  const handleProgressClick = (event) => {
    try {
      // console.log(event.nativeEvent);

      let clickLocation = event.nativeEvent.offsetX;
      // console.log("click location : ", clickLocation);

      let widthTimeBar = (clickLocation * 100) / 720 + "%";
      timeRef.current.style.width = widthTimeBar;

      let audioLength = Math.round(audioRef.current.duration);
      let temp = parseInt((clickLocation / 720) * audioLength);
      // console.log("temp : ", temp);
      audioRef.current.currentTime = temp;

      handlePlayButton();
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  // Method to handle Karaoke button
  const handleKaraokeButton = async (flag = "default") => {
    try {
      // There are two user flows, one is when user clicks on Karaoke button and another flow is when user changes to another track

      let track = parseInt(localStorage.getItem("track"));
      // console.log(flag);
      if (flag === "button") {
        // Toggling Lyrics UI
        audioImageRef.current.classList.toggle("invisible");
        lyricsKaraokeRef.current.classList.toggle("invisible");
        karaokeOptionsRef.current.classList.toggle("invisible");
      }

      // Populating Lyrics
      let lyricsElement = Object.keys(songs[playlist[track]].lyrics).map(
        (item) => {
          return `<li key=${item} id=${item}>${
            songs[playlist[track]].lyrics[item]
          } </li>`;
        }
      );
      // console.log(lyricsElement);
      let lyricsHTML = lyricsElement.join("");
      lyricsKaraokeListRef.current.innerHTML = lyricsHTML;
    } catch (error) {
      console.log("Some error fetching");
    }
  };

  // Method to handle Karaoke audio change options
  const handelSelectedOptionsChange = (e) => {
    try {
      let track = parseInt(localStorage.getItem("track"));
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
      // console.log("hi raza ", playlist);
      // console.log("Mohiyaddeen raza audio : ", audioRef.current);

      // Setting track iterator to localstorage to persist data
      localStorage.setItem(
        "track",
        playlist.findIndex((ele) => ele === identifier).toString()
      );
      // Inititializing Audio element
      audioRef.current.src = songs[identifier].audio;
      currentTimeAudioRef.current.innerHTML = "0:00";

      // Updating the total time on the UI
      audioRef.current.onloadedmetadata = () => {
        // console.log("Duration: ", audioRef.current.duration);
        //Calculating and updating the total audio time tracker.
        // Get the total duration of the audio.
        let totalAudioTime = Math.round(audioRef.current.duration);
        // console.log("mohiyaddeen asd : ", totalAudioTime);
        let minutesTotal = Math.floor(totalAudioTime / 60);
        //Calculate minutes
        // calculate seconds
        let secondsTotal = totalAudioTime % 60;
        // if seconds is a single character add a "0" at the starting. eg :- 01,02,03...etc.
        if ((secondsTotal + "").length < 2) {
          secondsTotal = "0" + secondsTotal;
        }
        totalTimeAudioRef.current.innerHTML = minutesTotal + ":" + secondsTotal;
      };

      // console.log("mohiyaddeen raza asd : ", songs[identifier]);

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
  }, [songs]);
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
              ref={audioImageRef}
            />
            <div
              className="lg:h-96 md:3/4 w-full object-cover object-right-top p-2 audioImage  absolute invisible"
              id="LyricsKaraoke"
              ref={lyricsKaraokeRef}
            >
              <ul
                className="list-none overflow-y-auto h-full w-full"
                id="LyricsKaraokeList"
                ref={lyricsKaraokeListRef}
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
              <div className="audioTitle p-2 " ref={audioTitleRef}>
                {songs[identifier].name}
              </div>

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
          <audio id="audio" src="" ref={audioRef}></audio>

          {/* Audio Element */}

          {/* Controls */}
          <div id="controls">
            {/* Audio Time Tracker */}
            <div className="timeTracker flex justify-between">
              <div className="currentTimeAudio" ref={currentTimeAudioRef}>
                NaN:NaN
              </div>
              <div className="totalTimeAudio" ref={totalTimeAudioRef}>
                NaN:NaN
              </div>
            </div>
            {/* Audio Time Tracker */}

            {/* Progress Bar */}
            <div
              className="audio-track w-[720px] h-[10px] bg-gray-500 cursor-pointer "
              onClick={handleProgressClick}
            >
              <div
                className="timeBar w-[0px] h-[10px] bg-green-700"
                ref={timeRef}
              ></div>
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
                <div className="play_pause flex justify-center items-center transition-opacity duration-500 ease-in-out w-10">
                  <button
                    className="play material-symbols-outlined  "
                    onClick={handlePlayButton}
                    ref={btnPlayRef}
                  >
                    play_arrow
                  </button>
                  <button
                    className="pause material-symbols-outlined hidden   "
                    onClick={handlePauseButton}
                    ref={btnPauseRef}
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
                ref={karaokeOptionsRef}
              >
                <select
                  className="right-0 z-10 mt-2 w-32  shadow-md ring-1  ring-opacity-5 focus:outline-none  inline-flex  justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900  ring-inset  ring-gray-300 hover:bg-gray-50 cursor-pointer"
                  id="karaokeOptionsInput"
                  defaultValue={"normal"}
                  onChange={handelSelectedOptionsChange}
                  ref={karaokeOptionsInputRef}
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
