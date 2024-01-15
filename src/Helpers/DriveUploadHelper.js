import React, { useState } from "react";
// import { google } from "googleapis";

function DriveUploadHelper() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      document.getElementById("fileUploadEle").innerHTML =
        "please select a file";
      return;
    }

    const formData = new FormData();
    formData.set("file", selectedFile);
    formData.set("userId", 1);



    // console.log(formData);

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
        console.log(result)
        document.getElementById(
          "fileUploadEle"
        ).innerHTML = `File uploaded Successfully, File link : ${result}`;
      } else {
        document.getElementById("fileUploadEle").innerHTML =
          "Error uploading File";
      }
    } catch (error) {
      console.log(error);
      document.getElementById("fileUploadEle").innerHTML =
        "Error uploading File";
    }
  };

  const handleDelete = async () => {
    const formData1 = new FormData();
    formData1.set("fileName", "Heartbreak-Anniversary.mp3");
    formData1.set("userId", 1);
    try {
      const response = await fetch(
        "http://localhost:8080/api/audio/delete",
        {
          headers: {
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxfX0.ZMhWoD4VG3mnVcO1K1JmigCpcOnI7jLpKXZv4S4JJuM",
          },
          method: "DELETE",
          body:formData1
        }
      );

      if (response.ok) {
        document.getElementById(
          "fileUploadEle"
        ).innerHTML = `File deleted Successfully`;
      } else {
        document.getElementById("fileUploadEle").innerHTML =
          "Error deleting File";
      }
    } catch (error) {
      console.log(error);
      document.getElementById("fileUploadEle").innerHTML =
        "Error deleting File";
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-gray-200 border-2 border-black border-solid"
      >
        Upload
      </button>
      <button
        onClick={handleDelete}
        className="bg-gray-200 border-2 border-black border-solid"
      >
        Delete
      </button>
      <div id="fileUploadEle"></div>
      <div className="audioChecker">
        
      </div>
    </div>
  );
}
export default DriveUploadHelper;
