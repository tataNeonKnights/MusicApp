package com.example.MusicAppTeam.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Songs")
public class SongModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long sId;

    private String songName;
    @Column(nullable = false)
    private String audioSrc;
    private String imgSrc;

    @Column(length = 10000000)
    private String lyrics;
    private String bgmSrc;
    private String songDescription;




    @Column(nullable = false,unique = true)
    private String songId;

    @ManyToMany(mappedBy = "songsList",cascade = { CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private List<PlaylistModel> playlists;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id")
    private UserModel user;

    public SongModel() {
    }

    public SongModel(long sId, String songName, String audioSrc, String imgSrc, String lyrics, String bgmSrc, String songDescription, String songId, UserModel user) {
        this.sId = sId;
        this.songName = songName;
        this.audioSrc = audioSrc;
        this.imgSrc = imgSrc;
        this.lyrics = lyrics;
        this.bgmSrc = bgmSrc;
        this.songDescription = songDescription;
        this.songId = songId;
        this.user = user;
    }

    public String getSongDescription() {
        return songDescription;
    }

    public void setSongDescription(String songDescription) {
        this.songDescription = songDescription;
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

    public String getAudioSrc() {
        return audioSrc;
    }

    public void setAudioSrc(String audioSrc) {
        this.audioSrc = audioSrc;
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
