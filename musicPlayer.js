let audio = document.getElementById("audio"); // Take the audio element
let totalTime = document.querySelector(".audio-track"); // Take the audio track
let time = document.querySelector(".timeBar"); // Take the audio progress
let btnPlay = document.querySelector(".play"); // Take the play button
let btnPause = document.querySelector(".pause"); // Take the pause button
let btnPrev = document.querySelector(".prev"); // Take the switch button of the previous track
let btnNext = document.querySelector(".next"); // Take the button to switch the next track
let currentTimeAudio = document.querySelector(".currentTimeAudio");
let totalTimeAudio = document.querySelector(".totalTimeAudio");

let playlist = [
  "Heartbreak-Anniversary.mp3",
  "Ordinary-Person.mp3",
  "thank-you.mp3",
];

let track; //variable with track index

// Event before page loading
window.onload = function () {
  track = 0; // Assign zero to the variable
  currentTimeAudio.innerHTML = "0:00";
  totalTimeAudio.innerHTML = "0:00";
};

function switchTrack(numTrack) {
  // Change the src attribute value
  audio.src = "songs/" + playlist[numTrack];
  // Assign a song time of zero
  audio.currentTime = 0;
  time.style.width = 0;
  // Play the song
  audio.play();
}

btnPlay.addEventListener("click", function () {
  audio.play();

  // Start interval
  audioPlay = setInterval(function () {
    let currentAudioTime = Math.round(audio.currentTime);
    let minutesCurrent = Math.floor(currentAudioTime / 60);
    let secondsCurrent = currentAudioTime % 60;

    if ((secondsCurrent + "").length < 2) {
      secondsCurrent = "0" + secondsCurrent;
    }
    currentTimeAudio.innerHTML = minutesCurrent + ":" + secondsCurrent;

    // Get the value of what second the song is at
    let audioTime = Math.round(audio.currentTime);
    // We get songs with different durations
    let audioLength = Math.round(audio.duration);
    // Assign a width to an element at time
    time.style.width = (audioTime * 100) / audioLength + "%";

    let totalAudioTime = Math.round(audio.duration);
    let minutesTotal = Math.floor(totalAudioTime / 60);
    let secondsTotal = totalAudioTime % 60;

    if ((secondsTotal + "").length < 2) {
      secondsTotal = "0" + secondsTotal;
    }
    totalTimeAudio.innerHTML = minutesTotal + ":" + secondsTotal;

    // Compare what second the track is now and how long in total
    // And check that the track variable is less than four
    if (audioTime == audioLength && track < 2) {
      track++; // then Increase the variable
      switchTrack(track); // change track
      // Otherwise we check the same, but the track variable is greater than or equal to four
    } else if (audioTime == audioLength && track >= 2) {
      track = 0; // then we assign track to zero
      switchTrack(track); //Change track
    }
  }, 10);
});

btnPause.addEventListener("click", function () {
  audio.pause(); // Stops the song
  clearInterval(audioPlay); // stops the interval
});

btnPrev.addEventListener("click", function () {
  if (track > 0) {
    track--;
    switchTrack(track);
  } else {
    track = 2;
    switchTrack(track);
  }
});

btnNext.addEventListener("click", function () {
  if (track < 2) {
    track++;
    switchTrack(track);
  } else {
    track = 0;
    switchTrack(track);
  }
});

totalTime.addEventListener("click", function (event) {
  console.log(event.offsetX);
  console.log("clicked");

  let clickLocation = event.offsetX;

  let widthTimeBar = (clickLocation * 100) / 150 + "%";
  time.style.width = widthTimeBar;

  let audioLength = Math.round(audio.duration);
  audio.currentTime = (clickLocation / 150) * audioLength;

  btnPlay.click();
});
