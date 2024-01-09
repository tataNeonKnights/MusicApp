package com.example.MusicAppTeam.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Songs")
public class SongModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long sId;

    private String songName;
    private String audiSrc;
    private String imgSrc;

    @Column(length = 10000000)
    private String lyrics;
    private String bgmSrc;
    private String description;


    @Column(nullable = false,unique = true)
    private String songId;

    @ManyToMany(mappedBy = "songsList",cascade = { CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private List<PlaylistModel> playlists;


    @ManyToOne
    @JoinColumn(name = "id")
    private UserModel user;




    public SongModel() {
    }

    public SongModel(long sId, String songName, String audiSrc, String imgSrc, String lyrics, String bgmSrc, String description, String songId, UserModel user) {
        this.sId = sId;
        this.songName = songName;
        this.audiSrc = audiSrc;
        this.imgSrc = imgSrc;
        this.lyrics = lyrics;
        this.bgmSrc = bgmSrc;
        this.description = description;
        this.songId = songId;
        this.user = user;
    }

    public long getsId() {
        return sId;
    }

    public void setsId(long sId) {
        this.sId = sId;
    }

    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public List<PlaylistModel> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(List<PlaylistModel> playlists) {
        this.playlists = playlists;
    }

    public String getAudiSrc() {
        return audiSrc;
    }

    public void setAudiSrc(String audiSrc) {
        this.audiSrc = audiSrc;
    }

    public String getImgSrc() {
        return imgSrc;
    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

    public String getBgmSrc() {
        return bgmSrc;
    }

    public void setBgmSrc(String bgmSrc) {
        this.bgmSrc = bgmSrc;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSongId() {
        return songId;
    }

    public void setSongId(String songId) {
        this.songId = songId;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}
