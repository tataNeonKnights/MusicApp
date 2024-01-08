package com.example.MusicAppTeam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.converter.json.GsonBuilderUtils;

@SpringBootApplication
public class MusicAppTeamApplication {

	public static void main(String[] args) {
		SpringApplication.run(MusicAppTeamApplication.class, args);
		System.out.println("Started server");
	}
}
