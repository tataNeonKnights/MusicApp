package com.example.MusicAppTeam.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "playlist")
public class PlaylistModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long pId;
    @Column(nullable = false,unique = true)
    private String playlistCustomId;
    @Column(nullable = false)
    private String pName;
    private String pImageSrc;
    private String pDesc;



    @ManyToMany
    @JoinTable(
            name = "playlist_songs",
            joinColumns = @JoinColumn(name = "playlistCustomId"),
            inverseJoinColumns = @JoinColumn(name = "songId")
    )
    private List<SongModel> songsList;



    @ManyToOne
    @JoinColumn(name = "id")
    private UserModel user;

    public PlaylistModel() {
    }


    public PlaylistModel(long pId, String playlistCustomId, String pName, String pImageSrc, String pDesc, UserModel user) {
        this.pId = pId;
        this.playlistCustomId = playlistCustomId;
        this.pName = pName;
        this.pImageSrc = pImageSrc;
        this.pDesc = pDesc;
        this.user = user;
    }

    public long getpId() {
        return pId;
    }

    public void setpId(long pId) {
        this.pId = pId;
    }

    public String getPlaylistCustomId() {
        return playlistCustomId;
    }

    public void setPlaylistCustomId(String playlistCustomId) {
        this.playlistCustomId = playlistCustomId;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public String getpImageSrc() {
        return pImageSrc;
    }

    public void setpImageSrc(String pImageSrc) {
        this.pImageSrc = pImageSrc;
    }

    public String getpDesc() {
        return pDesc;
    }

    public void setpDesc(String pDesc) {
        this.pDesc = pDesc;
    }


    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public List<SongModel> getSongsList() {
        return songsList;
    }

    public void setSongsList(List<SongModel> songsList) {
        this.songsList = songsList;
    }
}
