import { getDownloadURL, ref } from "firebase/storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import NewMusicPlaylist from "./NewMusicPlaylist";
import TrendingPlaylists from "./TrendingPlaylists";
import ArtistsCardsHome from "./ArtistsCardsHome";
import PopularPlaylists from "./PopularPlaylists";
import SongsContext from "../Memory/SongsContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function MusicPlayer(props) {
  // To Switch tracks, using useNavigate() will not trigger a page refresh
  const navigate = useNavigate();

  // Used For Implementation of playing the audio when the user clicks on next or prev button
  const location = useLocation();

  // We Are Using useRef Hooks For DOM Monipaulations As Direct DOM Mainpulation Will Cause Unexpected Behaviours
  const audioRef = useRef(null);

  const timeRef = useRef(null);

  const btnPlayRef = useRef(null);

  const btnPauseRef = useRef(null);

  const currentTimeAudioRef = useRef(null);

  const totalTimeAudioRef = useRef(null);

  const audioTitleRef = useRef(null);

  const audioImageRef = useRef(null);

  const iteratorRef = useRef(0);

  const lyricsKaraokeListRef = useRef(null);

  const karaokeOptionsInputRef = useRef(null);

  const karaokeOptionsRef = useRef(null);

  const lyricsKaraokeRef = useRef(null);

  const { songs } = useContext(SongsContext);

  // Retreiving queuePlalist from localstorage - we will be storing queuePlalist to localstorage to persist the data
  let playlist = localStorage.getItem("playlist")?.split(",") || [];

  // Current Track Seeker Parameter in the endpoint
  let { identifier } = useParams();

  //Method to handle the playing of audio
  const handlePlayButton = () => {
    try {
      if (audioRef.current.paused) {
        audioRef.current.play();
        btnPlayRef.current.classList.add("hidden");
        btnPauseRef.current.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Error while handling play button:", error);
    }
  };

  //Method to handle the pausing of audio
  const handlePauseButton = () => {
    try {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        btnPlayRef.current.classList.remove("hidden");
        btnPauseRef.current.classList.add("hidden");
      }
    } catch (error) {
      console.error("Error while handling play button:", error);
    }
  };

  // created a function to handle the switching of audio tracks based on the next or prev direction
  const switchTrack = (direction) => {
    try {
      const currentIndex = playlist.findIndex((ele) => ele === identifier);

      if (direction === "next") {
        if (currentIndex < playlist.length - 1) {
          const nextTrackId = playlist[currentIndex + 1];

          // This state can be accesse using location that we defined in the top
          navigate(`/musicplayer/${nextTrackId}`, {
            state: { flag: "Change" },
          });
        } else if (currentIndex >= playlist.length - 1) {
          const nextTrackId = playlist[0];
          navigate(`/musicplayer/${nextTrackId}`, {
            state: { flag: "Change" },
          });
        }
      } else if (direction === "prev") {
        if (currentIndex > 0) {
          const prevTrackId = playlist[currentIndex - 1];
          navigate(`/musicplayer/${prevTrackId}`, {
            state: { flag: "Change" },
          });
        } else {
          const prevTrackId = playlist[playlist.length - 1];
          navigate(`/musicplayer/${prevTrackId}`, {
            state: { flag: "Change" },
          });
        }
      }
    } catch (error) {
      console.error("Error while switching tracks:", error);
    }
  };

  //Method to handle the clicke on the progress bar of audio
  const handleProgressClick = (event) => {
    try {
      // console.log(event.nativeEvent);

      let clickLocation = event.nativeEvent.offsetX;
      // console.log("click location : ", clickLocation);

      const progressBarWidth = 720;
      let widthTimeBar = (clickLocation * 100) / progressBarWidth + "%";
      timeRef.current.style.width = widthTimeBar;

      let audioLength = Math.round(audioRef.current.duration);
      let temp = parseInt((clickLocation / progressBarWidth) * audioLength);
      // console.log("temp : ", temp);

      if (audioRef.current) {
        audioRef.current.currentTime = temp;
      }

      handlePlayButton();
    } catch (error) {
      console.error("Error handling progress bar click:", error);
    }
  };

  //Method to handle the karaoke
  const handleKaraokeButton = () => {
    audioImageRef.current.classList.toggle("invisible");
    lyricsKaraokeRef.current.classList.toggle("invisible");
    karaokeOptionsRef.current.classList.toggle("invisible");
  };

  //Method to switching of audio from normal to instrumental and vice versa
  const handelSelectedOptionsChange = (e) => {
    try {
      if (e.target.value === "normal") {
        karaokeAudioChange("normal");
      } else if (e.target.value === "instrumental") {
        karaokeAudioChange("instrumental");
      }
    } catch (error) {
      console.error("Error handling selected options change:", error);
    }
  };

  // Audio switch helper
  const karaokeAudioChange = async (choice) => {
    handlePauseButton();

    if (audioRef.current) {
      if (choice === "instrumental") {
        audioRef.current.src = await getDownloadURL(
          ref(props.storage, songs[identifier].bgm)
        );
      } else if (choice === "normal") {
        audioRef.current.src = await getDownloadURL(
          ref(props.storage, songs[identifier].audio)
        );
      }
    }

    handlePlayButton();
  };

  useEffect(() => {
    try {
      // console.log("hii  hiiiasdfasd", songs);

      // Initializing elements
      const initializeElements = async () => {
        try {
          // Current song
          const selectedSong = songs[identifier];

          if (selectedSong) {
            // console.log("s s s 2", selectedSong.audio);

            // console.log("s s s ", audioRef.current);
            const audioStorageRef = ref(props.storage, selectedSong.audio);
            const imageStorageRef = ref(props.storage, selectedSong.image);

            audioRef.current.src = await getDownloadURL(audioStorageRef);
            audioImageRef.current.src = await getDownloadURL(imageStorageRef);

            timeRef.current.style.width = 0;

            karaokeOptionsInputRef.current.value = "normal";

            // Set title
            audioTitleRef.current.innerText = selectedSong.name;

            const totalAudioTime = Math.round(audioRef.current.duration);
            // console.log("mohiyaddeen asd : ", totalAudioTime);
            const minutesTotal = Math.floor(totalAudioTime / 60);
            //Calculate minutes
            // calculate seconds
            const secondsTotal = totalAudioTime % 60;
            // if seconds is a single character add a "0" at the starting. eg :- 01,02,03...etc.
            if ((secondsTotal + "").length < 2) {
              secondsTotal = "0" + secondsTotal;
            }
            totalTimeAudioRef.current.innerHTML =
              minutesTotal + ":" + secondsTotal;

            // console.log("hi bye hi ", flag);
            // Check if the next button or prev button was clicked
            if (location.state) {
              if (location.state.flag === "Change") {
                handlePlayButton();
              }
            }
            const lyricsElement = Object.keys(selectedSong.lyrics).map(
              (item) => {
                return `<li key=${item} id=${item}>${selectedSong.lyrics[item]} </li>`;
              }
            );
            const lyricsHTML = lyricsElement.join("");
            lyricsKaraokeListRef.current.innerHTML = lyricsHTML;

            iteratorRef.current = 0;
          }
        } catch (error) {
          console.log(error);
        }
      };

      initializeElements();

      // Event listener for timeupdate
      const handleTimeUpdate = () => {
        if (audioRef.current) {
          let currentAudioTime = Math.round(audioRef.current.currentTime);

          // Logic for Lyrics Seeker that will synchronize with audio's current time
          let LyricsKeyList = Object.keys(songs[identifier].lyrics);

          if (
            currentAudioTime > LyricsKeyList[iteratorRef.current] &&
            iteratorRef.current < LyricsKeyList.length &&
            LyricsKeyList[iteratorRef.current] !== "undefined"
          ) {
            let currentLyricKey = LyricsKeyList[iteratorRef.current];

            if (currentLyricKey) {
              let currentLyricElement =
                document.getElementById(currentLyricKey);
              if (currentLyricElement) {
                currentLyricElement.style.backgroundColor = "white";
                iteratorRef.current += 1;

                currentLyricElement = document.getElementById(
                  LyricsKeyList[iteratorRef.current]
                );
                // console.log(
                //   "ssss currentAudio : ",
                //   currentAudioTime,
                //   " current LYrics : ",
                //   currentLyricElement
                // );

                if (
                  currentLyricElement !== "undefined" &&
                  iteratorRef.current < LyricsKeyList.length
                ) {
                  // You can also scroll the lyrics list to keep the current lyric in view
                  if (
                    lyricsKaraokeListRef.current.offsetHeight - 300 <
                    currentLyricElement.offsetTop
                  ) {
                    lyricsKaraokeListRef.current.scrollTop =
                      currentLyricElement.offsetTop - 50;
                  }
                  currentLyricElement.style.backgroundColor = "green";
                }
              }
            }
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

          // Calculate and update timeBar width
          const progress =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          timeRef.current.style.width = `${progress}%`;
        }
      };

      // Method to handle when the user presses spacebar audio starts playing or stops playing

      const handleSpaceUpEvent = (event) => {
        try {
          // Check if the pressed key is the spacebar
          if (
            (event.code === "Space" || event.key === " ") &&
            audioRef.current
          ) {
            // Prevent default behavior of the space key
            event.preventDefault();

            // Toggle between play and pause based on the current audio state
            if (audioRef.current.paused) {
              handlePlayButton();
            } else {
              handlePauseButton();
            }
          }
        } catch (error) {
          console.error("Error handling space key event:", error);
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

      const handleAudioEnded = () => {
        switchTrack("next");
      };
      // Add event listener
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("ended", handleAudioEnded);
      document.addEventListener("keyup", handleSpaceUpEvent);
      document.addEventListener("keydown", handleSpaceDownEvent);

      // Clean up event listenera on component unmount
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
          handlePauseButton();
          audioRef.current.removeEventListener("ended", handleAudioEnded);
          document.removeEventListener("keyup", handleSpaceUpEvent);
          document.removeEventListener("keydown", handleSpaceDownEvent);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }, [songs, identifier]);
  try {
    return (
      <div className="">
        <div className="flex flex-col justify-center items-center py-12 ">
          {/* Audio Details */}
          <div className="audioDetails flex flex-col p-4 lg:w-1/2 sm:w-3/4 relative">
            <img
              className="lg:h-96 md:3/4 w-full object-cover object-right-top p-2 audioImage"
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
                {/* {Object.keys(songs[identifier].lyrics).map((item) => {
                  return (
                    <li key={item} id={item}>
                      {songs[identifier].lyrics[item]}
                    </li>
                  );
                })} */}
              </ul>
            </div>
            <div className="flex items-center justify-between">
              <div className="audioTitle p-2 " ref={audioTitleRef}>
                {/* {songs[identifier].name} */}
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
          <audio id="audio" src="" ref={audioRef} type="audio/mp3"></audio>

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
                  onClick={() => switchTrack("prev")}
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
                  onClick={() => switchTrack("next")}
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
                onClick={handleKaraokeButton}
              >
                mic
              </button>

              {/* Like Button */}
              <div className="group relative inline-block">
                <button
                  // onClick={colorchange}
                  className="w-10 cursor-pointer "
                >
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
    console.log(error);
  }
}
