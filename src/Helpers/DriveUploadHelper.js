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
    formData.set("audio", selectedFile);

    // console.log(formData);

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
        document.getElementById(
          "fileUploadEle"
        ).innerHTML = `File uploaded Successfully, File id : ${result.id}`;
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
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="bg-gray-200 border-2 border-black border-solid"
      >
        Upload
      </button>
      <div id="fileUploadEle"></div>
    </div>
  );
}

export default DriveUploadHelper;
