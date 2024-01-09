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
public class SongsController {

    private SongsService songsService;

    public SongsController(SongsService songsService) {
        super();
        this.songsService = songsService;
    }
    @PostMapping("/addsong")
    public ResponseEntity<SongModel> addSong(@RequestBody SongModel songModel){
        System.out.println(songModel.getDescription());
        return new ResponseEntity<SongModel>(songsService.saveSong(songModel), HttpStatus.CREATED);
    }

    @PutMapping("/updatesong")
    public String updateASong(@RequestBody SongModel NewSongModel){
        SongModel OriginalSongModel = songsService.getSongBysongId(NewSongModel.getSongId());
        if(OriginalSongModel!=null){
            if(NewSongModel.getUser()!=null){
                OriginalSongModel.setUser(NewSongModel.getUser());
            }
            if(NewSongModel.getSongName()!=null){
                OriginalSongModel.setSongName(NewSongModel.getSongName());
            }
            if(NewSongModel.getDescription()!=null){
                OriginalSongModel.setDescription(NewSongModel.getDescription());
            }
            if(NewSongModel.getAudiSrc()!=null){
                OriginalSongModel.setAudiSrc(NewSongModel.getAudiSrc());
            }
            if(NewSongModel.getBgmSrc()!=null)
            {
                OriginalSongModel.setBgmSrc(NewSongModel.getBgmSrc());
            }
            if(NewSongModel.getLyrics()!=null){
                OriginalSongModel.setLyrics(NewSongModel.getLyrics());
            }
            if (NewSongModel.getImgSrc()!=null){
                OriginalSongModel.setImgSrc(NewSongModel.getImgSrc());
            }
            songsService.saveSong(OriginalSongModel);
            OriginalSongModel.getUser().setEmail(null);
            OriginalSongModel.getUser().setName(null);
            OriginalSongModel.getUser().setPassword(null);

            return "Song Updated Successfully";
        }else{

            return "Song not Found";
        }

    }

    @DeleteMapping("/deletesong/{songid}")
    public String deleteASong(@PathVariable("songid") String songid){
        SongModel songModel = songsService.getSongBysongId(songid);
        if(songModel!=null)
        {
            List<PlaylistModel> playlists = songModel.getPlaylists();
            for(PlaylistModel playlistModel : playlists)
            {
                playlistModel.getSongsList().remove(songModel);
            }
            songsService.deleteSong(songModel);
            return "Song Deleted Successfully" ;
        }else {
            return "Song not found";
        }

    }


    @GetMapping("/getsongs")
    public List<SongModel> getSongs()
    {
        return songsService.getAllSongs();
    }

}
