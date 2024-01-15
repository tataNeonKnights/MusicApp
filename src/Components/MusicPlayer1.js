// OLD VERSION - FOR testing

import React, { useContext, useEffect, useRef, useState } from "react";
import NewMusicPlaylist from "./NewMusicPlaylist";
import TrendingPlaylists from "./TrendingPlaylists";
import ArtistsCardsHome from "./ArtistsCardsHome";
import PopularPlaylists from "./PopularPlaylists";
import { useParams } from "react-router-dom";
import SongsContext from "../Memory/SongsContext";
import { getDownloadURL, ref } from "firebase/storage";

export default function MusicPlayer1(props) {
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
  let playlist = localStorage.getItem("playlist")?.split(",") || [];
  // console.log("playlist master data in music player : ", playlist);

  // Parameter in the endpoint
  const { identifier } = useParams();
  // console.log("identifier", identifier);

  // State variable for keep tracking of whether the audio is playing or not
  // let playing;

  // SetInterval tracker for when the audio plays
  // let audioPlay=null;
  const [audioPlay, setAudioPlay] = useState(null);

  const { songs, getSongs, getFileUrl } = useContext(SongsContext);
  try {
    // Method to handle when the user presses spacebar audio starts playing or stops playing
    const handleSpaceUpEvent = (event) => {
      try {
        console.log("bye bye : ", audioRef.current);
        if (event.code === "Space" || event.key === " ") {
          if (btnPlayRef.current.classList.contains("hidden") === true) {
            handlePauseButton();
          } else {
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
    async function switchTrack(numTrack, flag = "default") {
      try {
        handlePauseButton();
        console.log("pause : ", numTrack);
        let audioSource;
        if (flag === "default") {
          audioSource = await getDownloadURL(
            ref(props.storage, songs[playlist[numTrack]].audio)
          );

          karaokeOptionsInputRef.current.value = "normal";
        } else if (flag === "karaokeAudioChange") {
          audioSource = await getDownloadURL(
            ref(props.storage, songs[playlist[numTrack]].bgm)
          );
        }

        loadAndPlayAudio(audioSource);
      } catch (error) {
        console.error("Error switching track:", error);
      }
    }

    function loadAndPlayAudio(audioSource) {
      try {
        audioRef.current.src = audioSource;

        console.log("Audio source set:", audioRef.current.src);

        handleKaraokeButton();

        // Initialize the audio progress bar and audio
        audioRef.current.currentTime = 0;
        timeRef.current.style.width = 0;

        handlePlayButton();
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    }

    // Method to handle toggle play and pause icons
    const handelPlayPause = (playingParam) => {
      try {
        btnPlayRef.current.classList.toggle("hidden", playingParam);
        btnPauseRef.current.classList.toggle("hidden", !playingParam);
      } catch (error) {
        console.error("Error handling play/pause:", error);
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

        audioImageRef.current.src = await getDownloadURL(
          ref(props.storage, songs[playlist[track]].image)
        );

        // Toggling the icons for play pause
        handelPlayPause(true);

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
        const intervalId = setInterval(function () {
          try {
            //Calculating and updating the current audio time tracker.
            // Get the value of what second the song is at.
            let currentAudioTime = Math.round(audioRef.current.currentTime);

            // Logic for synchronising lyrics with audio's current time
            if (
              currentAudioTime > LyricsKeyList[iterator] &&
              iterator < LyricsKeyList.length &&
              LyricsKeyList[iterator] !== "undefined"
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
                LyricsKeyList[iterator] !== "undefined" &&
                iterator < LyricsKeyList.length
              ) {
                if (
                  lyricsKaraokeListRef.current.offsetHeight - 100 <
                  document.getElementById(LyricsKeyList[iterator]).offsetTop
                ) {
                  lyricsKaraokeListRef.current.scrollTop =
                    document.getElementById(LyricsKeyList[iterator]).offsetTop -
                    50;
                }

                // document.getElementById("LyricsKaraokeList").scrollTop =
                //   document.getElementById(LyricsKeyList[iterator]).offsetTop;

                document.getElementById(
                  LyricsKeyList[iterator]
                ).style.backgroundColor = "green";
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
              console.log("hih hihi");
              localStorage.setItem("track", (track + 1).toString());
              // localStorage.setItem("track", (track + 1).toString());
              // switchTrack(track + 1); // change track
              // // Otherwise we check the same, but the track variable is greater than or equal to queue playlist length
            } else if (
              audioTime === audioLength &&
              track >= playlist.length - 1
            ) {
              localStorage.setItem("track", (0).toString());
            }
          } catch (error) {
            console.log(error);
          }
        }, 10);
        setAudioPlay(intervalId);
      } catch (error) {
        console.error("Error handling play button:", error);
      }
    };

    const handlePauseButton = async () => {
      try {
        // console.log("clicked");
        // console.log(" interval tracker ", audioPlay);
        await audioRef.current.pause(); // Stops the song
        handelPlayPause(false);

        console.log("hi hi hi hi hi ihi ihih ii");
      } catch (error) {
        console.error("Error handling pause button:", error);
      }
    };

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
        console.error("Error handling previous button:", error);
      }
    };

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
        console.error("Error handling next button:", error);
      }
    };

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
        audioRef.current.currentTime = temp;

        handlePlayButton();
      } catch (error) {
        console.error("Error handling progress bar click:", error);
      }
    };

    const handleKaraokeButton = async (flag = "default") => {
      try {
        // There are two user flows, one is when the user clicks on Karaoke button,
        // and another flow is when the user changes to another track

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
        console.error("Error handling karaoke button:", error);
      }
    };

    const handelSelectedOptionsChange = (e) => {
      try {
        let track = parseInt(localStorage.getItem("track"));
        if (e.target.value === "normal") {
          switchTrack(track);
        } else if (e.target.value === "instrumental") {
          switchTrack(track, "karaokeAudioChange");
        }
      } catch (error) {
        console.error("Error handling selected options change:", error);
      }
    };

    useEffect(() => {
      try {
        // console.log("hi raza ", playlist);
        const initializeElements = async () => {
          try {
            // Setting track iterator to localstorage to persist data
            localStorage.setItem(
              "track",
              playlist.findIndex((ele) => ele === identifier).toString()
            );

            if (Object.keys(songs).length > 0 && playlist.length > 0) {
              // Inititializing Audio element
              const audioFileUrl = await getDownloadURL(
                ref(props.storage, songs[identifier].audio)
              );

              // clearInterval(audioPlay);
              // setAudioPlay(null);

              audioRef.current.src = audioFileUrl;
              console.log("Mohiyaddeen raza audio : ", audioRef.current.src);
              const imageFileUrl = await getDownloadURL(
                ref(props.storage, songs[identifier].image)
              );
              console.log("raza raza : ", imageFileUrl);
              audioImageRef.current.src = imageFileUrl;
            }

            currentTimeAudioRef.current.innerHTML = "0:00";

            // console.log("Duration: ", audioRef.current.duration);
            // Calculating and updating the total audio time tracker.
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
            totalTimeAudioRef.current.innerHTML =
              minutesTotal + ":" + secondsTotal;
            document.addEventListener("keydown", handleSpaceDownEvent);
            document.addEventListener("keyup", handleSpaceUpEvent);
            audioRef.current.addEventListener("ended", handleTrackEnded);
          } catch (error) {
            console.log("Some error fetching");
          }
        };
        initializeElements();

        const handleTrackEnded = () => {
          let track = parseInt(localStorage.getItem("track"));
          console.log("Track : ", track);
          // Logic to switch to the next track when the current one ends
          clearInterval(audioPlay);
          setAudioPlay(null);
          switchTrack(track);
        };

        // if (audioPlay) {
        //   clearInterval(audioPlay);
        //   setAudioPlay(null);
        // }

        // Cleaning up the event listener on keydown and keyup
        return () => {
          document.removeEventListener("keydown", handleSpaceDownEvent);
          document.removeEventListener("keyup", handleSpaceUpEvent);
          if (audioRef.current) {
            audioRef.current.removeEventListener("ended", handleTrackEnded);
          }
          clearInterval(audioPlay);
          setAudioPlay(null);
        };
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    }, [songs]); // An empty dependency array if songs is not expected to change

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
