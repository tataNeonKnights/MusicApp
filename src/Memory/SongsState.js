import React, { useState } from "react";
import SongsContext from "./SongsContext";

const SongsState = ({ children }) => {
  const [userSongs, setUserSongs] = useState({});

  const [songs, setSongs] = useState({
    "song-1": {
      name: "Heartbreak anniversary",
      audio:
        "https://drive.google.com/uc?export=download&id=16fFZ9UmNQU9PKU50hz3VO89qs0jDURy6",
      image:
        "https://drive.google.com/uc?export=download&id=1DMDspHFihmBKwbuPoDFvvuER6t_V4Ibp",
      lyrics: {
        2: " ",
        14: "Ooh",
        18: "Balloons are deflatin'",
        22: "Guess they look lifeless like me",
        26: "We miss you on your side of the bed, mmm",
        33: "Still got your things here",
        36: "And they stare at me like souvenirs",
        40: "Don't wanna let you out my head",
        46: "Just like the day that I met you",
        49: "The day I thought forever",
        51: "Said that you love me",
        53: "But that'll last for never",
        55: "It's cold outside",
        57: "Like when you walked out my life",
        58: "Why you walked out my life?",
        62: "I get like this every time",
        68: "On these days that feel like you and me",
        73: "Heartbreak anniversary",
        76: "'Cause I remember every time",
        83: "On these days that feel like you and me",
        88: "Heartbreak anniversary",
        89: "Do you ever think of me?",
        93: "No",
        98: "(Ooh) No-no, no",
        101: "(Ooh, ooh, ooh) Ooh, nah",
        106: "I'm buildin' my hopes up",
        110: "Like presents unopened 'til this day",
        114: "I still see the messages you read, mmm",
        120: "I'm foolishly patient",
        124: "(Foolishly patient)",
        125: "Can't get past the taste of your lips",
        128: "(Taste of your lips)",
        129: "Don't wanna let you out my head",
        135: "Just like the day that I met you",
        137: "The day I thought forever",
        139: "Said that you love me",
        141: "But that'll last for never",
        143: "It's cold outside",
        145: "Like when you walked out my life",
        147: "Why you walked out my life?",
        150: "I get like this every time",
        156: "On these days that feel like you and me",
        161: "Heartbreak anniversary",
        165: "'Cause I remember every time",
        172: "On these days that feel like you and me",
        176: "Heartbreak anniversary",
        178: "Do you ever think of me?",
        182: "Of me",
        186: "'Cause I think of you, think of you",
        194: "",
      },
      user: 1,
      bgm: "https://drive.google.com/uc?export=download&id=1PMSYiLyPiur82ITgDLQxj8mBm9GLJn6s",
      duration: "3:18",
      description: "desc1",
      songid: "song-1",
    },
    "song-2": {
      name: "Ordinary person",
      audio:
        "https://drive.google.com/uc?export=download&id=1k9Kp0cV6Q8GUyVcL5DQu24LWWoWW95w4",
      image:
        "https://drive.google.com/uc?export=download&id=17ZPiomFrioTsECVxFfjICkzquMBOAuUS",
      lyrics: {
        2: " ",
        14: "Ooh",
        18: "Balloons are deflatin'",
        22: "Guess they look lifeless like me",
        26: "We miss you on your side of the bed, mmm",
        33: "Still got your things here",
        36: "And they stare at me like souvenirs",
        40: "Don't wanna let you out my head",
        46: "Just like the day that I met you",
        49: "The day I thought forever",
        51: "Said that you love me",
        53: "But that'll last for never",
        55: "It's cold outside",
        57: "Like when you walked out my life",
        58: "Why you walked out my life?",
        62: "I get like this every time",
        68: "On these days that feel like you and me",
        73: "Heartbreak anniversary",
        76: "'Cause I remember every time",
        83: "On these days that feel like you and me",
        88: "Heartbreak anniversary",
        89: "Do you ever think of me?",
        93: "No",
        98: "(Ooh) No-no, no",
        101: "(Ooh, ooh, ooh) Ooh, nah",
        106: "I'm buildin' my hopes up",
        110: "Like presents unopened 'til this day",
        114: "I still see the messages you read, mmm",
        120: "I'm foolishly patient",
        124: "(Foolishly patient)",
        125: "Can't get past the taste of your lips",
        128: "(Taste of your lips)",
        129: "Don't wanna let you out my head",
        135: "Just like the day that I met you",
        137: "The day I thought forever",
        139: "Said that you love me",
        141: "But that'll last for never",
        143: "It's cold outside",
        145: "Like when you walked out my life",
        147: "Why you walked out my life?",
        150: "I get like this every time",
        156: "On these days that feel like you and me",
        161: "Heartbreak anniversary",
        165: "'Cause I remember every time",
        172: "On these days that feel like you and me",
        176: "Heartbreak anniversary",
        178: "Do you ever think of me?",
        182: "Of me",
        186: "'Cause I think of you, think of you",
        194: "",
      },
      user: 1,
      bgm: "https://drive.google.com/uc?export=download&id=1mXRyeiD9XM-EAO__BIKRGcD_Ak5JhKqD",
      duration: "2:18",
      description: "desc2",
      songid: "song-2",
    },
    "song-3": {
      name: "Thank you",
      audio:
        "https://drive.google.com/uc?export=download&id=19B6Sb4Gmit5yB7kc3EFm-vSj67V8xv1H",
      image:
        "https://drive.google.com/uc?export=download&id=1k8SrfRDSGc4fy6wKUG-IYJRntCFwU1WF",
      lyrics: {
        2: " ",
        14: "Ooh",
        18: "Balloons are deflatin'",
        22: "Guess they look lifeless like me",
        26: "We miss you on your side of the bed, mmm",
        33: "Still got your things here",
        36: "And they stare at me like souvenirs",
        40: "Don't wanna let you out my head",
        46: "Just like the day that I met you",
        49: "The day I thought forever",
        51: "Said that you love me",
        53: "But that'll last for never",
        55: "It's cold outside",
        57: "Like when you walked out my life",
        58: "Why you walked out my life?",
        62: "I get like this every time",
        68: "On these days that feel like you and me",
        73: "Heartbreak anniversary",
        76: "'Cause I remember every time",
        83: "On these days that feel like you and me",
        88: "Heartbreak anniversary",
        89: "Do you ever think of me?",
        93: "No",
        98: "(Ooh) No-no, no",
        101: "(Ooh, ooh, ooh) Ooh, nah",
        106: "I'm buildin' my hopes up",
        110: "Like presents unopened 'til this day",
        114: "I still see the messages you read, mmm",
        120: "I'm foolishly patient",
        124: "(Foolishly patient)",
        125: "Can't get past the taste of your lips",
        128: "(Taste of your lips)",
        129: "Don't wanna let you out my head",
        135: "Just like the day that I met you",
        137: "The day I thought forever",
        139: "Said that you love me",
        141: "But that'll last for never",
        143: "It's cold outside",
        145: "Like when you walked out my life",
        147: "Why you walked out my life?",
        150: "I get like this every time",
        156: "On these days that feel like you and me",
        161: "Heartbreak anniversary",
        165: "'Cause I remember every time",
        172: "On these days that feel like you and me",
        176: "Heartbreak anniversary",
        178: "Do you ever think of me?",
        182: "Of me",
        186: "'Cause I think of you, think of you",
        194: "",
      },
      user: 1,
      bgm: "https://drive.google.com/uc?export=download&id=1PMSYiLyPiur82ITgDLQxj8mBm9GLJn6s",
      duration: "4:20",
      description: "desc3",
      songid: "song-3",
    },
  });

  const uploadImage = async (imagefile) => {
    const formData = new FormData();
    formData.set("file", imagefile);
    try {
      const response = await fetch("http://localhost:5000/files/upload", {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfX0.ZMhWoD4VG3mnVcO1K1JmigCpcOnI7jLpKXZv4S4JJuM",
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        return `https://drive.google.com/uc?export=download&id=${result.id}`;
      } else {
        console.log("error uploading audio file");
      }
    } catch (error) {
      console.log("error uploading audio file");
    }
  };

  const uploadAudio = async (audiofile) => {
    const formData = new FormData();
    formData.set("file", audiofile);

    try {
      const response = await fetch("http://localhost:5000/files/upload", {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfX0.ZMhWoD4VG3mnVcO1K1JmigCpcOnI7jLpKXZv4S4JJuM",
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        return `https://drive.google.com/uc?export=download&id=${result.id}`;
      } else {
        console.log("error uploading audio file");
      }
    } catch (error) {
      console.log("error uploading audio file");
    }
  };

  const uploadInstrumental = async (instrumentalfile) => {
    const formData = new FormData();
    formData.set("file", instrumentalfile);
    try {
      const response = await fetch("http://localhost:5000/files/upload", {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfX0.ZMhWoD4VG3mnVcO1K1JmigCpcOnI7jLpKXZv4S4JJuM",
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        return `https://drive.google.com/uc?export=download&id=${result.id}`;
      } else {
        console.log("error uploading audio file");
      }
    } catch (error) {
      console.log("error uploading audio file");
    }
  };

  const loadUserSongs = () => {
    try {
      let userSongsStore = Object.keys(songs).filter((item) => {
        if (songs[item].user === 1) return item;
      });

      let userSongsStoreObject = {};

      userSongsStore.forEach((item) => {
        userSongsStoreObject[item] = songs[item];
      });

      console.log("raza", userSongsStoreObject);
      setUserSongs(userSongsStoreObject);
    } catch (error) {
      console.log("some error occured");
    }
  };

  const addSong = async (
    name,
    audio,
    image,
    lyrics,
    user,
    bgm,
    description,
    songid
  ) => {
    try {
      const response = await fetch("https://dummy-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name,
          audio,
          image,
          lyrics,
          user,
          bgm,
          description,
          songid,
        }),
      });

      const song = await response.json();
      setSongs(songs.concat(song));
    } catch (error) {
      console.log("some error occured");
    }
  };

  const deleteSong = async (name) => {
    try {
      const response = await fetch(`https://dummy-url/${name}`, {
        method: "DELETE",
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfX0.ZMhWoD4VG3mnVcO1K1JmigCpcOnI7jLpKXZv4S4JJuM",
        },
      });

      const result = await response.json();
      // load songs - pending step
    } catch (error) {
      console.log("some error occured");
    }
  };
  return (
    <SongsContext.Provider
      value={{
        songs,
        loadUserSongs,
        userSongs,
        uploadAudio,
        uploadInstrumental,
        uploadImage,

        addSong,
      }}
    >
      {children}
    </SongsContext.Provider>
  );
};

export default SongsState;
