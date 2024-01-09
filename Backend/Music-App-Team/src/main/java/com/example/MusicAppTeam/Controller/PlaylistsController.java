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
    public List<PlaylistModel> getPlaylists(){
        List<PlaylistModel> playlistList = playlistsService.getAllPlaylists();
        for(int i =0;i<playlistList.size();i++){
            playlistList.get(i).getUser().setEmail(null);
            playlistList.get(i).getUser().setName(null);
            playlistList.get(i).getUser().setPassword(null);
        }

        return playlistList;
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
if(OriginalPlaylistModel!=null){
    if(NewPlaylistModel.getpDesc()!=null){
        OriginalPlaylistModel.setpDesc(NewPlaylistModel.getpDesc());
    }
    if(NewPlaylistModel.getpName()!=null){
        OriginalPlaylistModel.setpName(NewPlaylistModel.getpName());
    }
    if(NewPlaylistModel.getUser()!=null){
        OriginalPlaylistModel.setUser(NewPlaylistModel.getUser());
    }
    if(NewPlaylistModel.getpImageSrc()!=null){
        OriginalPlaylistModel.setpImageSrc(NewPlaylistModel.getpImageSrc());
    }
    return new ResponseEntity<PlaylistModel>(playlistsService.savePlaylist(OriginalPlaylistModel), HttpStatus.CREATED);
}else{
    return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
}
    }

    @DeleteMapping("/deleteplaylist/{playlistCustomId}")
    public ResponseEntity<String> deleteASong(@PathVariable("playlistCustomId") String playlistCustomId){
        PlaylistModel playlistModel = playlistsService.getPlaylistByPlaylistCustomId(playlistCustomId);
if(playlistModel!=null){
    playlistsService.deletePlaylist(playlistModel);
    return new ResponseEntity<String>("Playlist Deleted Succesfully !", HttpStatus.CREATED);
}else{
    return new ResponseEntity<String>("User Not Found", HttpStatus.BAD_REQUEST);
}

    }


}
