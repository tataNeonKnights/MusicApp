package com.example.MusicAppTeam.Controller;


import com.example.MusicAppTeam.Model.PlaylistModel;


import com.example.MusicAppTeam.Model.SongModel;
import com.example.MusicAppTeam.Service.PlaylistsService;


import com.example.MusicAppTeam.Service.SongsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class PlaylistsController {

    private PlaylistsService playlistsService;
    private SongsService songsService;

    public PlaylistsController(PlaylistsService playlistsService,SongsService songsService) {
        super();
        this.playlistsService = playlistsService;
        this.songsService = songsService;

    }

    @PostMapping("/addplaylist")
    public ResponseEntity<PlaylistModel> addPlaylist(@RequestBody PlaylistModel playlistModel){
        return new ResponseEntity<PlaylistModel>(playlistsService.savePlaylist(playlistModel), HttpStatus.CREATED);
    }

    @GetMapping("/getplaylists")
    public List<PlaylistModel> getPlaylists()
    {
        return playlistsService.getAllPlaylists();
    }

    @PutMapping("/addsongsplaylist/{playlistid}")
    public ResponseEntity<PlaylistModel> addSongsToPlaylist(@RequestBody List<String> songlist,@PathVariable("playlistid") String playlistid)
    {
        PlaylistModel playlistModel = playlistsService.getPlaylistByPlaylistCustomId(playlistid);
        List<SongModel> songModelList = new ArrayList<>();
        for(String item : songlist)
        {
            SongModel songModel = songsService.getSongBysongId(item);
            songModelList.add(songModel);
        };
        playlistModel.setSongsList(songModelList);
        return new ResponseEntity<PlaylistModel>( playlistsService.savePlaylist(playlistModel),HttpStatus.CREATED);

    }

    @PutMapping("/updateplaylist")
    public ResponseEntity<PlaylistModel> updateASong(@RequestBody PlaylistModel NewPlaylistModel){
        PlaylistModel OriginalPlaylistModel = playlistsService.getPlaylistByPlaylistCustomId(NewPlaylistModel.getPlaylistCustomId());

        OriginalPlaylistModel.setUser(NewPlaylistModel.getUser());
        OriginalPlaylistModel.setpDesc(NewPlaylistModel.getpDesc());
        OriginalPlaylistModel.setpName(NewPlaylistModel.getpName());
        OriginalPlaylistModel.setpImageSrc(NewPlaylistModel.getpImageSrc());


        return new ResponseEntity<PlaylistModel>(playlistsService.savePlaylist(OriginalPlaylistModel), HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteplaylist/{playlistCustomId}")
    public ResponseEntity<String> deleteASong(@PathVariable("playlistCustomId") String playlistCustomId){
        PlaylistModel playlistModel = playlistsService.getPlaylistByPlaylistCustomId(playlistCustomId);

        return new ResponseEntity<String>(playlistsService.deletePlaylist(playlistModel), HttpStatus.CREATED);
    }


}
