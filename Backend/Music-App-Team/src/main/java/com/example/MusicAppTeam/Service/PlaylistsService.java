package com.example.MusicAppTeam.Service;

import com.example.MusicAppTeam.Model.PlaylistModel;
import com.example.MusicAppTeam.Model.SongModel;
import com.example.MusicAppTeam.Repository.PlaylistsRepository;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistsService {

    private PlaylistsRepository playlistsRepository;


    public PlaylistsService(PlaylistsRepository playlistsRepository) {
        super();
        this.playlistsRepository = playlistsRepository;
    }

    public PlaylistModel savePlaylist(PlaylistModel playlistModel) {
        return playlistsRepository.save(playlistModel);
    }

    public List<PlaylistModel> getAllPlaylists() {
        return playlistsRepository.findAll();
    }


    public PlaylistModel getPlaylistByPlaylistCustomId(String playlistCustomId){
        return playlistsRepository.findByplaylistCustomId(playlistCustomId);
    }

    public PlaylistModel getPlaylistById(long id) {
        return playlistsRepository.findById(id).orElseThrow(() -> new Error("error not found"));

    }

    public String deletePlaylist(PlaylistModel playlistModel){
        playlistsRepository.delete(playlistModel);
        return "success";
    }


}
