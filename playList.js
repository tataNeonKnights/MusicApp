// Get references to HTML elements
let audio = document.getElementById("audio"); // Reference to the audio element
let btnPlay = document.querySelector(".play"); // Reference to the play button
let btnPause = document.querySelector(".pause"); // Reference to the pause button
let play_pause = document.querySelector(".play_pause"); // Reference to the play/pause container

// Define the playlist, song titles, artists, and song durations
let playlist = [
  "Ordinary-Person.mp3",
  "Heartbreak-Anniversary.mp3",
  "thank-you.mp3",
];

let titleSong = [
  "Ordinary Person by Anirudh Ravichander",
  "Heartbreak Anniversary by Giveon",
  "Thank you by Dido",
];

let artists = ["Anirudh Ravichander", "Giveon", "Dido"];
let audioTime = ["2:18", "4:07", "4:20"];

// Initialize variables
let track; // Current track index
let playing; // Indicates whether audio is playing

// Execute code when the page is loaded
window.onload = function () {
  playing = false; // Audio is not playing initially
  updatePlaylistNames(); // Update the displayed playlist in the HTML
};

// Update the playlist names displayed in the HTML
function updatePlaylistNames() {
  const playlistItems = document.querySelectorAll(".playlist-item"); // Get all playlist items

  // Update the information for each playlist item
  playlistItems.forEach((item, index) => {
    if (index < titleSong.length) {
      item.querySelector(".music-title").textContent = titleSong[index]; // Set song title
      item.querySelector(".artist-name").textContent = artists[index]; // Set artist name
      item.querySelector(".music-time").textContent = audioTime[index]; // Set song duration
    }
  });
}

// Prevent the spacebar key from scrolling the page
window.addEventListener("keydown", function (event) {
  if (event.code === "Space" || event.key === " ") {
    event.preventDefault();
  }
});

// Handle spacebar keypress to play or pause audio
document.addEventListener("keyup", function (event) {
  if (event.code === "Space" || event.key === " ") {
    if (playing === true) {
      btnPause.click(); // Pause audio if it's playing
    } else {
      btnPlay.click(); // Play audio if it's paused
    }
  }
});

// Handle audio playback when a track ends
audio.addEventListener("ended", function () {
  if (track < playlist.length - 1) {
    track++; // Move to the next track if available
    switchTrack(track); // Switch to the next track
  } else {
    track = 0; // Start from the beginning if all tracks have played
    switchTrack(track);
  }
});

// Switch to a new track
function switchTrack(numTrack) {
  audio.src = "Resources/Songs-Raza/" + playlist[numTrack]; // Set audio source
  audio.currentTime = 0; // Reset audio playback to the beginning
  let timeElement = document.querySelector(".time"); // Get time display element
  if (timeElement) {
    timeElement.style.width = 0; // Reset the time display
  }
  btnPlay.click(); // Play the new track
}

// Toggle play/pause button visibility
play_pause.addEventListener("click", function () {
  if (playing === true) {
    btnPlay.classList.add("hidden"); // Hide the play button
    btnPause.classList.remove("hidden"); // Show the pause button
  } else {
    btnPlay.classList.remove("hidden"); // Show the play button
    btnPause.classList.add("hidden"); // Hide the pause button
  }
});

// Play audio and handle track switching
btnPlay.addEventListener("click", function () {
  audio.play(); // Start audio playback
  playing = true; // Set the playing flag to true

  // Check if the current track has finished, and if so, switch to the next one
  audioPlay = setInterval(function () {
    let audioTime = Math.round(audio.currentTime); // Get the current audio playback time
    let audioLength = Math.round(audio.duration); // Get the total duration of the audio track

    if (audioTime == audioLength && track < 2) {
      track++; // Move to the next track if available
      switchTrack(track); // Switch to the next track
    } else if (audioTime == audioLength && track >= 2) {
      track = 0; // Start from the beginning if all tracks have played
      switchTrack(track);
    }
  }, 10); // Check every 10 milliseconds
});

// Pause audio and clear the interval
btnPause.addEventListener("click", function () {
  audio.pause(); // Pause audio playback
  playing = false; // Set the playing flag to false
  clearInterval(audioPlay); // Clear the interval for track switching
});


  const downloadButton = document.querySelector(".download"); // Get the download button

  // Handle download button click
  downloadButton.addEventListener("click", function () {
    const currentTrackIndex = track; // Get the index of the currently playing track

    const downloadURL = "Resources/Songs-Raza/" + playlist[currentTrackIndex]; // Get the URL of the track to download

    const downloadLink = document.createElement("a"); // Create a download link element
    downloadLink.href = downloadURL; // Set the link's URL
    downloadLink.download = titleSong[currentTrackIndex] + ".mp3"; // Set the downloaded file name
    downloadLink.style.display = "none";

    document.body.appendChild(downloadLink); // Add the link to the document
    downloadLink.click(); // Trigger the download
    document.body.removeChild(downloadLink); // Remove the link from the document
  });


// Shuffle Button
let shuffleButton = document.querySelector(".shuffle"); // Get the shuffle button
let isShuffled = false; // Indicates if the playlist is shuffled

// Handle shuffle button click
shuffleButton.addEventListener("click", function () {
  if (!isShuffled) {
    shufflePlaylist(); // Shuffle the playlist if it's not already shuffled
    isShuffled = true; // Update the shuffle flag
  } else {
    resetPlaylistOrder(); // Reset the playlist order if it's already shuffled
    isShuffled = false; // Update the shuffle flag
  }
});

// Shuffle the playlist randomly
function shufflePlaylist() {
  const originalPlaylist = playlist.slice(); // Create a copy of the original playlist
  for (let i = originalPlaylist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [originalPlaylist[i], originalPlaylist[j]] = [
      originalPlaylist[j],
      originalPlaylist[i],
    ]; // Swap elements randomly
  }

  playlist = originalPlaylist; // Update the playlist with the shuffled order
  resetTrack(); // Reset the current track to the first one
  updatePlaylistNames(); // Update the displayed playlist in the HTML
}

// Reset the playlist order to the original
function resetPlaylistOrder() {
  playlist = [
    "Ordinary-Person.mp3",
    "Heartbreak-Anniversary.mp3",
    "thank-you.mp3",
  ]; // Restore the original playlist order
  resetTrack(); // Reset the current track to the first one
  updatePlaylistNames(); // Update the displayed playlist in the HTML
}

// Reset the current track to the first one
function resetTrack() {
  track = 0;
  switchTrack(track);
}


// Calculate the number of songs and total time
let numberOfSongs = playlist.length; // Assuming playlist is your array of songs
let totalDuration = calculateTotalDuration(); // Define a function to calculate the total duration

// Update the HTML elements with the calculated values
document.getElementById("songCount").textContent = `${numberOfSongs} Songs`;
document.getElementById("totalTime").textContent = formatTime(totalDuration); // Format total duration

// Function to calculate the total duration
function calculateTotalDuration() {
    let totalDuration = 0;
    for (let i = 0; i < playlist.length; i++) {
        // Assuming audioTime is an array of song durations in the format "mm:ss"
        let [minutes, seconds] = audioTime[i].split(":");
        totalDuration += parseInt(minutes) * 60 + parseInt(seconds);
    }
    return totalDuration;
}

// Function to format the time as "mm:ss"
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
