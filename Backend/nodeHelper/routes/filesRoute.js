const express = require("express");
const router = express.Router();
const { Readable } = require("stream");
const { google } = require("googleapis");
const fetchuser = require("../middleware/fetchuser");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN);

const oauth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2client,
});

const expressFileUpload = require("express-fileupload");

router.use(expressFileUpload());

router.post("/upload", fetchuser, async (req, res) => {
  try {
    console.log("mohiyaddeenraza ", req.files.file.data);
    // Converting the buffer received to readable stream
    const stream = Readable.from(req.files.file.data);
    const mediaFile = req.files.file;
    const userId = req.user.id;
    // console.log(mediaFile)
    // console.log("hi", userId);

    // google drive parent folder id
    const parentFolderId = "167qvY8H_-IpJitDqM0QslPc9gWcNM5PC";
    const folderName = `User_${userId}`; // Using a consistent user folder name
    let customFolderId = null;

    // Check if the user folder exists in the parent folder
    const listResponse = await drive.files.list({
      q: `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: "files(id)",
    });

    // Create the user folder if it doesn't exist
    if (listResponse.data.files.length === 0) {
      const folderMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      };
      const folderResult = await drive.files.create({
        requestBody: folderMetadata,
      });
      customFolderId = folderResult.data.id;
    } else {
      // User Folder exists, use its ID
      customFolderId = listResponse.data.files[0].id;
    }

    // Check if the file with the same name exists in the user folder
    const existingFile = await drive.files.list({
      q: `'${customFolderId}' in parents and name = '${mediaFile.name}' and trashed = false`,
      fields: "files(id)",
    });

    if (existingFile.data.files.length === 0) {
      const result = await drive.files.create({
        requestBody: {
          name: mediaFile.name,
          mimeType: mediaFile.mimetype,
          parents: [customFolderId],
        },
        media: {
          mimeType: mediaFile.mimetype,
          body: stream,
        },
      });
      if (result.status === 200) {
        //   console.log(req.files);
        //   console.log(result);
        res.status(200).json({ id: result.data.id });
      } else {
        res.status(400).json("Internal server error");
      }
    } else {
      // File already exists
      res.status(409).json({ error: "File already exists" }); // Conflict status code for duplicate file
    }
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.delete("/delete/:fileName", fetchuser, async (req, res) => {
  try {
    const fileName = req.params.fileName; // Extract the fileName from the request parameters
    const userId = req.user.id;
    const folderName = `User_${userId}`; // Using a consistent user folder name
    const parentFolderId = "167qvY8H_-IpJitDqM0QslPc9gWcNM5PC";
    let customFolderId = null;

    // Check if the user folder exists in the parent folder
    const listResponse = await drive.files.list({
      q: `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: "files(id)",
    });

    if (listResponse.data.files.length === 0) {
      res.status(404).send("Not Found");
    } else {
      // User Folder exists, use its ID
      customFolderId = listResponse.data.files[0].id;
    }

    // Check if the file with the same name exists in the user folder
    const existingFile = await drive.files.list({
      q: `'${customFolderId}' in parents and name = '${fileName}' and trashed = false`,
      fields: "files(id)",
    });

    if (existingFile.data.files.length === 0) {
      res.status(404).send("Not Found");
    } else {
      let fileId = existingFile.data.files[0].id;
      const result = await drive.files.delete({
        fileId: fileId,
      });
      // console.log(result)
      if (result.status === 204) {
        res.status(200).send("File deleted successfully");
      } else {
        res.status(400).send("Internal server error");
      }
    }
  } catch (error) {
    console.log("error :", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
