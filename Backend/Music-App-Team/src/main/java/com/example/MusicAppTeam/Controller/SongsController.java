package com.example.MusicAppTeam.Controller;


import com.example.MusicAppTeam.Model.PlaylistModel;
import com.example.MusicAppTeam.Model.SongModel;

import com.example.MusicAppTeam.Service.SongsService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:3000/")
public class SongsController {

    private SongsService songsService;

    public SongsController(SongsService songsService) {
        super();
        this.songsService = songsService;
    }
    @PostMapping("/addsong")
    public ResponseEntity<SongModel> addSong(@RequestBody SongModel songModel){
        return new ResponseEntity<SongModel>(songsService.saveSong(songModel), HttpStatus.CREATED);
    }

    @PutMapping("/updatesong")
    public ResponseEntity<SongModel> updateASong(@RequestBody SongModel NewSongModel){
        SongModel OriginalSongModel = songsService.getSongBysongId(NewSongModel.getSongId());

        OriginalSongModel.setSongName(NewSongModel.getSongName());
        OriginalSongModel.setSongDescription(NewSongModel.getSongDescription());
        OriginalSongModel.setAudioSrc(NewSongModel.getAudioSrc());
        OriginalSongModel.setBgmSrc(NewSongModel.getBgmSrc());
        OriginalSongModel.setImgSrc(NewSongModel.getImgSrc());
        OriginalSongModel.setLyrics(NewSongModel.getLyrics());
        OriginalSongModel.setUser(NewSongModel.getUser());
        return new ResponseEntity<SongModel>(songsService.saveSong(OriginalSongModel), HttpStatus.CREATED);
    }

    @DeleteMapping("/deletesong/{songid}")
    public ResponseEntity<String> deleteASong(@PathVariable("songid") String songid){
        SongModel songModel = songsService.getSongBysongId(songid);
        if(songModel!=null)
        {
            List<PlaylistModel> playlists = songModel.getPlaylists();
            for(PlaylistModel playlistModel : playlists)
            {
                playlistModel.getSongsList().remove(songModel);
            }
        }
        return new ResponseEntity<String>(songsService.deleteSong(songModel), HttpStatus.OK);
    }


    @GetMapping("/getsongs")
    public List<SongModel> getSongs()
    {
        return songsService.getAllSongs();
    }

}
