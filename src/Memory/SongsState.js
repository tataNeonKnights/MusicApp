import React, { useEffect, useRef, useState } from "react";
import SongsContext from "./SongsContext";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const SongsState = ({ children }) => {
  const [userSongs, setUserSongs] = useState({});
  const [loading, setLoading] = useState(false);
  const statusRef = useRef(null)




  // const [songs, setSongs] = useState({
  //   "song-1": {
  //     name: "Heartbreak anniversary",
  //     audio:
  //       "https://drive.google.com/uc?export=download&id=16fFZ9UmNQU9PKU50hz3VO89qs0jDURy6",
  //     image:
  //       "https://drive.google.com/uc?export=download&id=1DMDspHFihmBKwbuPoDFvvuER6t_V4Ibp",
  //     lyrics: {
  //       2: " ",
  //       14: "Ooh",
  //       18: "Balloons are deflatin'",
  //       22: "Guess they look lifeless like me",
  //       26: "We miss you on your side of the bed, mmm",
  //       33: "Still got your things here",
  //       36: "And they stare at me like souvenirs",
  //       40: "Don't wanna let you out my head",
  //       46: "Just like the day that I met you",
  //       49: "The day I thought forever",
  //       51: "Said that you love me",
  //       53: "But that'll last for never",
  //       55: "It's cold outside",
  //       57: "Like when you walked out my life",
  //       58: "Why you walked out my life?",
  //       62: "I get like this every time",
  //       68: "On these days that feel like you and me",
  //       73: "Heartbreak anniversary",
  //       76: "'Cause I remember every time",
  //       83: "On these days that feel like you and me",
  //       88: "Heartbreak anniversary",
  //       89: "Do you ever think of me?",
  //       93: "No",
  //       98: "(Ooh) No-no, no",
  //       101: "(Ooh, ooh, ooh) Ooh, nah",
  //       106: "I'm buildin' my hopes up",
  //       110: "Like presents unopened 'til this day",
  //       114: "I still see the messages you read, mmm",
  //       120: "I'm foolishly patient",
  //       124: "(Foolishly patient)",
  //       125: "Can't get past the taste of your lips",
  //       128: "(Taste of your lips)",
  //       129: "Don't wanna let you out my head",
  //       135: "Just like the day that I met you",
  //       137: "The day I thought forever",
  //       139: "Said that you love me",
  //       141: "But that'll last for never",
  //       143: "It's cold outside",
  //       145: "Like when you walked out my life",
  //       147: "Why you walked out my life?",
  //       150: "I get like this every time",
  //       156: "On these days that feel like you and me",
  //       161: "Heartbreak anniversary",
  //       165: "'Cause I remember every time",
  //       172: "On these days that feel like you and me",
  //       176: "Heartbreak anniversary",
  //       178: "Do you ever think of me?",
  //       182: "Of me",
  //       186: "'Cause I think of you, think of you",
  //       194: "",
  //     },
  //     user: 1,
  //     bgm: "https://drive.google.com/uc?export=download&id=1PMSYiLyPiur82ITgDLQxj8mBm9GLJn6s",
  //     duration: "3:18",
  //     description: "desc1",
  //     songid: "song-1",
  //   },
  //   "song-2": {
  //     name: "Ordinary person",
  //     audio:
  //       "https://drive.google.com/uc?export=download&id=1k9Kp0cV6Q8GUyVcL5DQu24LWWoWW95w4",
  //     image:
  //       "https://drive.google.com/uc?export=download&id=17ZPiomFrioTsECVxFfjICkzquMBOAuUS",
  //     lyrics: {
  //       2: " ",
  //       14: "Ooh",
  //       18: "Balloons are deflatin'",
  //       22: "Guess they look lifeless like me",
  //       26: "We miss you on your side of the bed, mmm",
  //       33: "Still got your things here",
  //       36: "And they stare at me like souvenirs",
  //       40: "Don't wanna let you out my head",
  //       46: "Just like the day that I met you",
  //       49: "The day I thought forever",
  //       51: "Said that you love me",
  //       53: "But that'll last for never",
  //       55: "It's cold outside",
  //       57: "Like when you walked out my life",
  //       58: "Why you walked out my life?",
  //       62: "I get like this every time",
  //       68: "On these days that feel like you and me",
  //       73: "Heartbreak anniversary",
  //       76: "'Cause I remember every time",
  //       83: "On these days that feel like you and me",
  //       88: "Heartbreak anniversary",
  //       89: "Do you ever think of me?",
  //       93: "No",
  //       98: "(Ooh) No-no, no",
  //       101: "(Ooh, ooh, ooh) Ooh, nah",
  //       106: "I'm buildin' my hopes up",
  //       110: "Like presents unopened 'til this day",
  //       114: "I still see the messages you read, mmm",
  //       120: "I'm foolishly patient",
  //       124: "(Foolishly patient)",
  //       125: "Can't get past the taste of your lips",
  //       128: "(Taste of your lips)",
  //       129: "Don't wanna let you out my head",
  //       135: "Just like the day that I met you",
  //       137: "The day I thought forever",
  //       139: "Said that you love me",
  //       141: "But that'll last for never",
  //       143: "It's cold outside",
  //       145: "Like when you walked out my life",
  //       147: "Why you walked out my life?",
  //       150: "I get like this every time",
  //       156: "On these days that feel like you and me",
  //       161: "Heartbreak anniversary",
  //       165: "'Cause I remember every time",
  //       172: "On these days that feel like you and me",
  //       176: "Heartbreak anniversary",
  //       178: "Do you ever think of me?",
  //       182: "Of me",
  //       186: "'Cause I think of you, think of you",
  //       194: "",
  //     },
  //     user: 1,
  //     bgm: "https://drive.google.com/uc?export=download&id=1mXRyeiD9XM-EAO__BIKRGcD_Ak5JhKqD",
  //     duration: "2:18",
  //     description: "desc2",
  //     songid: "song-2",
  //   },
  //   "song-3": {
  //     name: "Thank you",
  //     audio:
  //       "https://drive.google.com/uc?export=download&id=19B6Sb4Gmit5yB7kc3EFm-vSj67V8xv1H",
  //     image:
  //       "https://drive.google.com/uc?export=download&id=1k8SrfRDSGc4fy6wKUG-IYJRntCFwU1WF",
  //     lyrics: {
  //       2: " ",
  //       14: "Ooh",
  //       18: "Balloons are deflatin'",
  //       22: "Guess they look lifeless like me",
  //       26: "We miss you on your side of the bed, mmm",
  //       33: "Still got your things here",
  //       36: "And they stare at me like souvenirs",
  //       40: "Don't wanna let you out my head",
  //       46: "Just like the day that I met you",
  //       49: "The day I thought forever",
  //       51: "Said that you love me",
  //       53: "But that'll last for never",
  //       55: "It's cold outside",
  //       57: "Like when you walked out my life",
  //       58: "Why you walked out my life?",
  //       62: "I get like this every time",
  //       68: "On these days that feel like you and me",
  //       73: "Heartbreak anniversary",
  //       76: "'Cause I remember every time",
  //       83: "On these days that feel like you and me",
  //       88: "Heartbreak anniversary",
  //       89: "Do you ever think of me?",
  //       93: "No",
  //       98: "(Ooh) No-no, no",
  //       101: "(Ooh, ooh, ooh) Ooh, nah",
  //       106: "I'm buildin' my hopes up",
  //       110: "Like presents unopened 'til this day",
  //       114: "I still see the messages you read, mmm",
  //       120: "I'm foolishly patient",
  //       124: "(Foolishly patient)",
  //       125: "Can't get past the taste of your lips",
  //       128: "(Taste of your lips)",
  //       129: "Don't wanna let you out my head",
  //       135: "Just like the day that I met you",
  //       137: "The day I thought forever",
  //       139: "Said that you love me",
  //       141: "But that'll last for never",
  //       143: "It's cold outside",
  //       145: "Like when you walked out my life",
  //       147: "Why you walked out my life?",
  //       150: "I get like this every time",
  //       156: "On these days that feel like you and me",
  //       161: "Heartbreak anniversary",
  //       165: "'Cause I remember every time",
  //       172: "On these days that feel like you and me",
  //       176: "Heartbreak anniversary",
  //       178: "Do you ever think of me?",
  //       182: "Of me",
  //       186: "'Cause I think of you, think of you",
  //       194: "",
  //     },
  //     user: 1,
  //     bgm: "https://drive.google.com/uc?export=download&id=1PMSYiLyPiur82ITgDLQxj8mBm9GLJn6s",
  //     duration: "4:20",
  //     description: "desc3",
  //     songid: "song-3",
  //   },
  // });

  const [songs, setSongs] = useState({});

  const getSongs = async () => {
    console.log("get");
    try {
      const response = await fetch("http://localhost:8080/api/auth/getsongs", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        // headers: {
        //   "auth-token": localStorage.getItem("token"),
        // },

        // body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      if (response.ok) {
        const data = await response.json(); // parses JSON response into native JavaScript objects
        let songsMasterData = {};
        data.forEach((item) => {
          songsMasterData[item.songId] = {
            name: item.songName,
            audio: item.audioSrc,
            image: item.imgSrc,
            lyrics: JSON.parse(item.lyrics),
            user: item.user.id,
            bgm: item.bgmSrc,
            description: item.songDescription,
            songid: item.songId,
          };
        });
        // console.log("mohiyaddeen ",songsMasterData)
        // console.log("raza",data)
        setSongs(songsMasterData);
      }
    } catch (error) {
      console.log("some error")
    }
  };

  const uploadImage = async (imagefile) => {
    const formData = new FormData();
    formData.set("userId", 1);
    formData.set("file", imagefile);
    try {
      const response = await fetch("http://localhost:8080/api/audio/upload", {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfX0.ZMhWoD4VG3mnVcO1K1JmigCpcOnI7jLpKXZv4S4JJuM",
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        return result;
      } else {
        console.log("error uploading audio file");
      }
    } catch (error) {
      if (statusRef.current) {
        statusRef.current.innerHTML = `Upload failed`
      }

      console.log("error uploading audio file");
    }
  };

  const uploadAudio = async (audiofile) => {
    const formData = new FormData();
    formData.set("userId", 1);
    formData.set("file", audiofile);

    try {
      const response = await fetch("http://localhost:8080/api/audio/upload", {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfX0.ZMhWoD4VG3mnVcO1K1JmigCpcOnI7jLpKXZv4S4JJuM",
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        return result;
      } else {
        console.log("error uploading audio file");
      }
    } catch (error) {
      if (statusRef.current) {
        statusRef.current.innerHTML = `Upload failed`
      }

      console.log("error uploading audio file");
    }
  };

  const uploadInstrumental = async (instrumentalfile) => {
    const formData = new FormData();
    formData.set("userId", 1);
    formData.set("file", instrumentalfile);

    try {
      const response = await fetch("http://localhost:8080/api/audio/upload", {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfX0.ZMhWoD4VG3mnVcO1K1JmigCpcOnI7jLpKXZv4S4JJuM",
        },
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        return result;
      } else {
        console.log("error uploading audio file");
      }
    } catch (error) {
      if (statusRef.current) {
        statusRef.current.innerHTML = `Upload failed`
      }

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


      const response = await fetch("http://localhost:8080/api/auth/addsong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          songName: name,
          audioSrc: audio,
          imgSrc: image,
          lyrics: JSON.stringify(lyrics),
          user: {
            id: user
          },
          bgmSrc: bgm,
          songDescription: description,
          songId: songid,
        }),
      });
      // console.log("uploaded")
      if (response.ok) {
        if (statusRef.current) {
          statusRef.current.classList.remove("text-red-600")
          statusRef.current.classList.add("text-green-600")

          statusRef.current.innerHTML = `Song Uploaded `
          setTimeout(() => {
            statusRef.current.innerHTML = ''
          }, 4000)
        }


      } else {
        if (statusRef.current) {
          statusRef.current.classList.remove("text-green-600")
          statusRef.current.classList.add("text-red-600")
          statusRef.current.innerHTML = `Upload failed !`
          setTimeout(() => {
            statusRef.current.innerHTML = ''
          }, 4000)
        }
      }

    } catch (error) {
      if (statusRef.current) {
        statusRef.current.classList.remove("text-green-600")
        statusRef.current.classList.add("text-red-600")
        statusRef.current.innerHTML = `Upload failed !`
        setTimeout(() => {
          statusRef.current.innerHTML = ''
        }, 4000)
      }

      console.log("Some Error Occurs");
    }

  };
  const deleteSong = async (songId, songs) => {

    try {
      const response = await fetch(`http://localhost:8080/api/auth/deletesong/${songId}`, {
        method: "DELETE",
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfX0.ZMhWoD4VG3mnVcO1K1JmigCpcOnI7jLpKXZv4S4JJuM",
        },
      });

      setSongs(() => {
        let songsTemp = Object.keys(songs)
        let songsUpdatedObj = {}

        songsTemp.forEach((item) => {
          if (item !== songId) {
            songsUpdatedObj[item] = songs[item]
          }
        })

        console.log("hi hi ghi bye bye bye ", songsUpdatedObj)

        return songsUpdatedObj
      })


      const result = await response.text();
      console.log("hi bye sadj ", result)

      // load songs - pending step
      if (response.ok) {
        const deleteMessageBox = document.getElementById("deleteInfo");
        deleteMessageBox.innerHTML = `Song => ${songs[songId].name}<= Deleted`;
      } else {
        const deleteMessageBox = document.getElementById("deleteInfo");
        deleteMessageBox.innerHTML = "Something Went Wrong";
      }
    } catch (error) {
      console.log("Some Error Occurs");
    }

  };

  useEffect(() => {
    getSongs()
  }, []);
  return (
    <SongsContext.Provider
      value={{
        songs,
        loadUserSongs,
        userSongs,
        uploadAudio,
        uploadInstrumental,
        uploadImage,
        getSongs,
        addSong,
        deleteSong,
        loading,
        setLoading,
        statusRef

      }}
    >
      {children}
    </SongsContext.Provider>
  );
};

export default SongsState;
