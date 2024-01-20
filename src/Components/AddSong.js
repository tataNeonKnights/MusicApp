import React, { useContext, useEffect, useState } from "react";
import SongsContext from "../Memory/SongsContext";

export default function AddSong() {
  const [sname, setSname] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [lyricsFile, setLyricsFile] = useState(null);
  const [instrumentalFile, setInstrumentalFile] = useState(null);

  const { uploadAudio, uploadInstrumental, uploadImage, addSong, songs, loading, setLoading, statusRef } =
    useContext(SongsContext);
  useEffect(() => {
    // console.log("mohiyaddeen ", songs);
  }, [songs, loading]);

  const parseLyrics = (data) => {
    try {
      const lines = data.split("\n");
      let masterLrcData = {};
      for (let line of lines) {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        //   console.log("match : ", match);
        //   console.log("minutes : ",match[1])
        //   console.log("seconds : ",Math.round(match[2]))
        let totalT = match[1] * 60 + Math.round(match[2]);
        masterLrcData[totalT + 2] = match[3];

        //   console.log("total time in seconds : ",totalT)
        //   console.log("text : ",match[3])
      }
      return masterLrcData;

      // console.log("lines : ", lines);
    } catch (error) {
      console.log("Some Error Occurs");
    }
  };
  let x = 128;

  const handleSubmit = async (e) => {
    // document.getElementById("loader").style.display = "block";
    

    e.preventDefault();

    try {
      setLoading(true)

      let instrumentalDriveId = null;
      let LrcData = null;
      let imageDriveId = null;
      let audioDriveId = await uploadAudio(audioFile);
      if (lyricsFile) {
        const lrc = await lyricsFile.text();
        LrcData = parseLyrics(lrc);
      }
      if (instrumentalFile) {
        instrumentalDriveId = await uploadInstrumental(instrumentalFile);
      }
      if (imageFile) {
        imageDriveId = await uploadImage(imageFile);
      }
      // console.log("lrc : ", LrcData);
      // console.log("audio  : ", audioDriveId);
      // console.log("instrumental : ", instrumentalDriveId);
      // console.log("image : ", imageDriveId);

      // console.log(response)
     
      addSong(
        sname,
        audioDriveId,
        imageDriveId,
        LrcData,
        1,
        instrumentalDriveId,
        description,
        `song-${x}`
      )
      x++;
      setLoading(false)
     
    } catch (error) {

      console.log("Some error Occurs");
    }


    // console.log(x)
    //Need to implemetn custom alert
    // setSname("");
    // setDescription("")
    // setAudioFile(null)
    // setImageFile(null)
    // setLyricsFile(null)
    // setInstrumentalFile(null)
    // if(status){
    //   document.getElementById("uploadStatus").innerHTML=`Song "${sname}" Uploaded`;
    //   document.getElementById("uploadStatus").classList.remove("text-red-600");
    //   document.getElementById("uploadStatus").classList.add("text-green-600");
    //   setTimeout(()=>{
    //         document.getElementById("uploadStatus").innerHTML='';
    //       },4000)

    //   }else{

    //     document.getElementById("uploadStatus").innerHTML="Upload Failed !"
    //     document.getElementById("uploadStatus").classList.remove("text-green-600");
    //     document.getElementById("uploadStatus").classList.add("text-red-600");
    //     setTimeout(()=>{
    //       document.getElementById("uploadStatus").innerHTML='';
    //     },4000)

    // }
  };

  const handleNameChange = (e) => {
    setSname(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleAudioFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };
  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleLyricsFileChange = (e) => {
    setLyricsFile(e.target.files[0]);
  };
  const handleInstrumentalFileChange = (e) => {
    setInstrumentalFile(e.target.files[0]);
  };


  try {
    return (
      <>
        {<div
          id="uploadStatus"
          className=" uploadStatus  fixed flex justify-center w-screen h-10 text-3xl font-bold items-center bg-opacity-0  transition-all "
          ref={statusRef}
        >

        </div>}
        <div className="p-10 flex items-center flex-col w-full">
          <div className="font-bold text-2xl underline ">Add Song</div>

          <div className="text-lg">Song Details</div>
          <form
            className="flex items-center w-full flex-wrap font-normal"
            onSubmit={handleSubmit}
          >
            <div className="songNameContainer flex flex-col items-center w-1/2 p-2">
              <label htmlFor="songName" className="self-start mb-2">
                Name
              </label>
              <input
                type="text"
                name="songName"
                id="songName"
                className="w-full rounded  p-2 border border-solid border-black shadow-sm hover:shadow-lg focus:border-amber-500  focus:ring-amber-500 appearance-none focus:outline-none focus:ring-2 focus:bg-blue-50  transition-all"
                placeholder="Enter song name"
                value={sname}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="songAudioContainer flex flex-col items-center w-1/2 p-2">
              <label htmlFor="songAudio" className="self-start mb-2">
                Audio File
              </label>
              <input
                type="file"
                name="songAudio"
                id="songAudio"
                className="w-full rounded  p-2 border border-solid border-black shadow-sm hover:shadow-lg focus:border-amber-500  focus:ring-amber-500 appearance-none focus:outline-none focus:ring-2 focus:bg-blue-50 transition-all"
                onChange={handleAudioFileChange}
                accept="audio/mp3"
                required
              />
            </div>
            <div className="songImageContainer flex flex-col items-center w-1/2 p-2">
              <label htmlFor="songImage" className="self-start mb-2">
                Audio Image
              </label>
              <input
                type="file"
                name="songImage"
                id="songImage"
                className="w-full rounded  p-2 border border-solid border-black shadow-sm hover:shadow-lg focus:border-amber-500  focus:ring-amber-500 appearance-none focus:outline-none focus:ring-2 focus:bg-blue-50 transition-all"
                onChange={handleImageFileChange}
                accept="image/*"
              />
            </div>
            <div className="songLyricsContainer flex flex-col items-center w-1/2 p-2">
              <label htmlFor="songLyrics" className="self-start mb-2">
                Lyrics LRC File
              </label>
              <input
                type="file"
                name="songLyrics"
                id="songLyrics"
                className="w-full rounded  p-2 border border-solid border-black shadow-sm hover:shadow-lg focus:border-amber-500  focus:ring-amber-500 appearance-none focus:outline-none focus:ring-2 focus:bg-blue-50 transition-all"
                onChange={handleLyricsFileChange}
                accept=".lrc"
              />
            </div>
            <div className="songInstrumentalContainer flex flex-col items-center w-1/2 p-2">
              <label htmlFor="songInstrumental" className="self-start mb-2">
                Instrumental Audio
              </label>
              <input
                type="file"
                name="songInstrumental"
                id="songInstrumental"
                className="w-full rounded  p-2 border border-solid border-black shadow-sm hover:shadow-lg focus:border-amber-500  focus:ring-amber-500 appearance-none focus:outline-none focus:ring-2 focus:bg-blue-50 transition-all"
                onChange={handleInstrumentalFileChange}
                accept="audio/mp3"
              />
            </div>

            <div className="songDescriptionContainer flex flex-col items-center w-1/2 p-2">
              <label htmlFor="songDescription" className="self-start mb-2">
                Description
              </label>
              <input
                type="text"
                name="songDescription"
                id="songDescription"
                className="w-full rounded  p-2 border border-solid border-black shadow-sm hover:shadow-lg focus:border-amber-500  focus:ring-amber-500 appearance-none focus:outline-none focus:ring-2 focus:bg-blue-50 transition-all"
                placeholder="Enter your delivery pincode"
                value={description}
                onChange={handleDescriptionChange}
                required
              />
            </div>

            {loading && <div id="loader"></div>}
            <button
              className="p-2 m-6 bg-green-400 border-2 border-solid border-black rounded-lg"
              type="submit"
            >
              Add Song
            </button>
          </form>
        </div>
      </>
    );
  } catch (error) {
    console.log("some error occured");
  }
}
