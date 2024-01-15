package com.FirebaseHelper.files;


import com.google.cloud.storage.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/audio")
@CrossOrigin("http://localhost:3000/")
public class FileController {

    @Value("${firebase.storage.bucket}")
    private String bucketName;  // Add this property to your application.properties

    @PostMapping("/upload")
    public ResponseEntity<String> uploadAudioFile(@RequestParam("file") MultipartFile file, @RequestParam("userId") String userId) {
        System.out.println("hi");
        try {

            // Get a reference to the storage service, which is used to create references in your storage bucket
            var storage = StorageClient.getInstance().bucket(bucketName);

            // Generate a unique filename or use the original filename
            String fileName = file.getOriginalFilename();

            // Create a user-specific folder
            String userFolder = "musicapp/Users/" + userId + "/";

            // Check if the user folder exists
            boolean userFolderExists = storage.get(userFolder) != null;

            // If the user folder doesn't exist, create it
            if (!userFolderExists) {
                System.out.println("hi");
                storage.create(userFolder, new byte[0], "application/x-directory");
            }


            // Check if the file already exists in the user's folder
            if (storage.get(userFolder + fileName) != null) {
                System.out.println("hello");
                String downloadUrl = "https://storage.googleapis.com/" + bucketName + "/" + userFolder + fileName;

                return ResponseEntity.status(HttpStatus.CONFLICT).body(downloadUrl);
            }


            // Upload the file to Firebase Storage within the user's folder
            storage.create(userFolder + fileName, file.getInputStream(), file.getContentType());
            String downloadUrl = "https://storage.googleapis.com/" + bucketName + "/" + userFolder + fileName;


            return ResponseEntity.ok("/musicapp/Users/"+userId+"/"+fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAudioFile(@RequestParam("userId") String userId, @RequestParam("fileName") String fileName) {
        System.out.println("bye");

        try {
            // Get a reference to the storage service
            var storage = StorageClient.getInstance().bucket(bucketName);

            // Create the user-specific folder path
            String userFolder = "musicapp/Users/" + userId + "/";

            // Check if the file exists in the user's folder
            if (storage.get(userFolder + fileName) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found in the user's folder.");
            }

            Blob blob = storage.get(userFolder + fileName);
            // Delete the file from Firebase Storage
            blob.delete();


            return ResponseEntity.ok("File deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file: " + e.getMessage());
        }
    }

}

