package com.FirebaseHelper.files;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.IOException;

@SpringBootApplication
public class FilesApplication {


	public static void main(String[] args) {
		SpringApplication.run(FilesApplication.class, args);
	}


}
