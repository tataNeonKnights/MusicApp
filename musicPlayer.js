let audio = document.getElementById("audio"); // Take the audio element
let totalTime = document.querySelector(".audio-track"); // Take the audio track
let time = document.querySelector(".timeBar"); // Take the audio progress
let btnPlay = document.querySelector(".play"); // Take the play button
let btnPause = document.querySelector(".pause"); // Take the pause button
let btnPrev = document.querySelector(".prev"); // Take the switch button of the previous track
let btnNext = document.querySelector(".next"); // Take the switch button of the next track
let currentTimeAudio = document.querySelector(".currentTimeAudio");// Take the current audio time tracker element
let totalTimeAudio = document.querySelector(".totalTimeAudio");// Take the total duration audio time tracker element
let audioTitle = document.querySelector(".audioTitle");// Take the audio title


//Initialized a placeholder playlist for the sake of development
let playlist = [
  "Heartbreak-Anniversary.mp3",
  "Ordinary-Person.mp3",
  "thank-you.mp3",
];


// Initalized titles for the audio tracks
let titleSong = [
  "Heartbreak Anniversary by Giveon",
  "Ordinary Person by Anirudh Ravichander",
  "Thank you by Dido",
];


//Created variable to track index
let track; 



// Created an event to fire when the webpage is loaded
// Updated variable to track name of the song
window.onload = function () {
  // Initialize the track
  track = 0;

  // Set the initial song title
  audioTitle.innerHTML = titleSong[track];

  // Set the current time and total time as well
  currentTimeAudio.innerHTML = "0:00";
  totalTimeAudio.innerHTML = "0:00";
};




// created a function to handle the switching of audio tracks.
function switchTrack(numTrack) {

  // Change the src attribute value of the audio element to the target audio track.
  audio.src = "Resources/Songs-Raza/" + playlist[numTrack];

  // Initilize the audio progress bar and audio 
  audio.currentTime = 0;
  time.style.width = 0;

  // Play the song
  btnPlay.click();
}


//Added an event listener on the play button to play the audio
btnPlay.addEventListener("click", function () {

  //Setting the title with respect to the audio playing
  audioTitle.innerHTML = titleSong[track];

  //Method to play the audio
  audio.play();

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
    if (audioTime == audioLength && track < 2) {
      track++; // then Increase the variable
      switchTrack(track); // change track
      // Otherwise we check the same, but the track variable is greater than or equal to three
    } else if (audioTime == audioLength && track >= 2) {
      track = 0; // then we assign track to zero
      switchTrack(track); //Change track
    }
  }, 10);



});



//Added an event listener on the pause button to pause the audio
btnPause.addEventListener("click", function () {
  audio.pause(); // Stops the song
  clearInterval(audioPlay); // stops the interval
});



//Added an event listener on the prev button to go back on the playlist
btnPrev.addEventListener("click", function () {
  if (track > 0) {
    track--;
    switchTrack(track);
  } else {
    track = 2;
    switchTrack(track);
  }
});



//Added an event listener on the next button to go forward on the playlist
btnNext.addEventListener("click", function () {
  if (track < 2) {
    track++;
    switchTrack(track);
  } else {
    track = 0;
    switchTrack(track);
  }
});



//Added an event listener on the audio progress bar because when a user clicks on the progress bar it should reflect the relative progress
totalTime.addEventListener("click", function (event) {
  console.log(event.offsetX);

  let clickLocation = event.offsetX;

  let widthTimeBar = (clickLocation * 100) / 150 + "%";
  time.style.width = widthTimeBar;

  let audioLength = Math.round(audio.duration);
  audio.currentTime = (clickLocation / 150) * audioLength;

  btnPlay.click();
});
