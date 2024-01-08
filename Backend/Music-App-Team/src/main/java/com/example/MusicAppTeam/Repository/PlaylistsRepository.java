package com.example.MusicAppTeam.Repository;

import com.example.MusicAppTeam.Model.PlaylistModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistsRepository extends JpaRepository<PlaylistModel,Long> {
    PlaylistModel findByplaylistCustomId(String playlistCustomId);
}
