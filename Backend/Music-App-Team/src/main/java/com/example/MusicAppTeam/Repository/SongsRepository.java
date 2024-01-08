package com.example.MusicAppTeam.Repository;

import com.example.MusicAppTeam.Model.PlaylistModel;
import com.example.MusicAppTeam.Model.SongModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongsRepository extends JpaRepository<SongModel,Long> {
    SongModel findBysongId(String songId);

}
