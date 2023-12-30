import React, { useEffect, useState } from "react";
import NewMusicPlaylist from "./NewMusicPlaylist";
import TrendingPlaylists from "./TrendingPlaylists";
import ArtistsCardsHome from "./ArtistsCardsHome";
import PopularPlaylists from "./PopularPlaylists";

export default function MusicPlayer() {
  let audio; // Take the audio element

  let time; // Take the audio progress
  let btnPlay; // Take the play button
  let btnPause; // Take the pause button

  let currentTimeAudio; // Take the current audio time tracker element
  let totalTimeAudio; // Take the total duration audio time tracker element
  let audioTitle; // Take the audio title

  // Initalized titles for the audio tracks

  //Created variable to track index and to check whether the audio is playing or not
  let track;
  let playing;
  let audioPlay;

  const [playlist, setPlaylist] = useState([
    "Heartbreak-Anniversary.mp3",
    "Ordinary-Person.mp3",
    "thank-you.mp3",
  ]);

  const [titleSong, settitleSong] = useState([
    "Heartbreak Anniversary by Giveon",
    "Ordinary Person by Anirudh Ravichander",
    "Thank you by Dido",
  ]);

  // Added an event listener so that when the user presses spacebar audio starts playing or stops playing
  const handleSpaceUpEvent = (event) => {
    if (event.code === "Space" || event.key === " ") {
      if (playing === true) {
        handlePauseButton();
      } else {
        console.log("clicked in space");
        handlePlayButton();
      }
    }
  };

  // Created an event to fire when the user hits spacebar and to prevent default behaviour of spacebar which is to scroll the page
  const handleSpaceDownEvent = (event) => {
    if (event.code === "Space" || event.key === " ") {
      event.preventDefault();
    }
  };

  // created a function to handle the switching of audio tracks.
  function switchTrack(numTrack) {
    // Change the src attribute value of the audio element to the target audio track.
    handlePauseButton();
    audio.src = "./Assets/Songs-Raza/" + playlist[numTrack];
    console.log(audio.src);

    // Initilize the audio progress bar and audio
    audio.currentTime = 0;
    time.style.width = 0;

    // Play the song
    handlePlayButton();
  }

  //Added an event listener to toggle play and pause icons
  const handelPlayPause = () => {
    console.log("play pause called");
    if (playing === true) {
      btnPlay.classList.add("hidden");
      btnPause.classList.remove("hidden");
    } else {
      btnPlay.classList.remove("hidden");
      btnPause.classList.add("hidden");
    }
  };

  //Added an event listener on the play button to play the audio
  const handlePlayButton = () => {
    //Setting the title with respect to the audio playing
    audioTitle.innerHTML = titleSong[track];

    //Method to play the audio

    audio.play();
    playing = true;
    handelPlayPause();

    // Now we will set an interval when the audio is playing and will clear the interval when the audio is paused
    audioPlay = setInterval(function () {
      //Calculating and updating the current audio time tracker.
      // Get the value of what second the song is at.
      let currentAudioTime = Math.round(audio.currentTime);
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
      if (audioTime === audioLength && track < 2) {
        track++; // then Increase the variable
        switchTrack(track); // change track
        // Otherwise we check the same, but the track variable is greater than or equal to three
      } else if (audioTime === audioLength && track >= 2) {
        track = 0; // then we assign track to zero
        switchTrack(track); //Change track
      }
    }, 10);
  };

  //Added an event listener on the pause button to pause the audio
  const handlePauseButton = () => {
    console.log("clicked");
    audio.pause(); // Stops the song
    playing = false;
    handelPlayPause();
    clearInterval(audioPlay); // stops the interval
  };

  //Added an event listener on the prev button to go back on the playlist
  const handlePrevButton = () => {
    if (track > 0) {
      track--;
      switchTrack(track);
    } else {
      track = 2;
      switchTrack(track);
    }
  };

  //Added an event listener on the next button to go forward on the playlist
  const handleNextButton = () => {
    if (track < 2) {
      track++;
      switchTrack(track);
    } else {
      track = 0;
      switchTrack(track);
    }
  };

  //Added an event listener on the audio progress bar because when a user clicks on the progress bar it should reflect the relative progress
  const handleProgressClick = (event) => {
    console.log(event.nativeEvent);

    let clickLocation = event.nativeEvent.offsetX;
    console.log("click location : ", clickLocation);

    let widthTimeBar = (clickLocation * 100) / 150 + "%";
    time.style.width = widthTimeBar;

    let audioLength = Math.round(audio.duration);
    let temp = parseInt((clickLocation / 150) * audioLength);
    console.log("temp : ", temp);
    audio.currentTime = temp;

    handlePlayButton();
  };

  useEffect(() => {
    audio = document.getElementById("audio"); // Take the audio element

    time = document.querySelector(".timeBar"); // Take the audio progress
    btnPlay = document.querySelector(".play"); // Take the play button
    btnPause = document.querySelector(".pause"); // Take the pause button

    currentTimeAudio = document.querySelector(".currentTimeAudio"); // Take the current audio time tracker element
    totalTimeAudio = document.querySelector(".totalTimeAudio"); // Take the total duration audio time tracker element
    audioTitle = document.querySelector(".audioTitle"); // Take the audio title

    // Initalized titles for the audio tracks

    //Created variable to track index and to check whether the audio is playing or not
    track = 0;
    playing = false;
    currentTimeAudio.innerHTML = "0:00";
    totalTimeAudio.innerHTML = "0:00";

    document.addEventListener("keydown", handleSpaceDownEvent);
    document.addEventListener("keyup", handleSpaceUpEvent);

    // Cleaning up the event listener on keydown and keyup
    return () => {
      document.removeEventListener("keydown", handleSpaceDownEvent);
      document.removeEventListener("keyup", handleSpaceUpEvent);
    };
  }, []);
  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center py-12">
        {/* Audio Details */}
        <div className="audioDetails flex flex-col p-4 ">
          <img
            className="lg:h-50 md:h-50 w-50 object-cover object-center p-2"
            src="https://dummyimage.com/720x400"
            alt="blog"
          />
          <div className="flex items-center justify-between">
            <div className="audioTitle p-2 ">title</div>

            <div className="flex flex-row">
              {/* Karaoke Button */}
              <button className="karaoke material-icons w-1/4 text-blue-500 mr-1">
                mic
              </button>

              {/* Loop Button */}
              <button className="material-symbols-outlined w-1/4 text-gray-500 mr-1">
                laps
              </button>

              {/* Volume Up Button */}
              <button className="material-symbols-outlined w-1/4 text-gray-500 mr-1">
              volume_up
              </button>

              {/* Volume Down Button */}
              <button className="material-symbols-outlined w-1/4 text-gray-500 mr-1">
              volume_down
              </button>

              {/* Volume Off Button */}
              <button className="material-symbols-outlined w-1/4 text-gray-500 mr-1">
              volume_off
              </button>

              {/* Like Button */}
              <button className="like material-icons w-1/4 text-green-500 mr-1">
                thumb_up
              </button>

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
        <audio
          id="audio"
          src="./Assets/Songs-Raza/Heartbreak-Anniversary.mp3"
        ></audio>

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
            className="audio-track w-[150px] h-[10px] bg-gray-500 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div className="timeBar w-[0px] h-[10px] bg-green-700"></div>
          </div>
          {/* Progress Bar */}

          {/* Button controls */}
          <div className="buttonControls flex justify-center items-center h-[5vh]">
            <button
              className="prev  material-symbols-outlined w-1/4"
              onClick={handlePrevButton}
            >
              skip_previous
            </button>
            <div
              className="play_pause flex justify-center items-center transition-opacity duration-500 ease-in-out w-1/4"
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
              className="next material-symbols-outlined  w-1/4 "
              onClick={handleNextButton}
            >
              skip_next
            </button>
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
}
