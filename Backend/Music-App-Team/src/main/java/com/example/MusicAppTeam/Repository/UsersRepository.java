package com.example.MusicAppTeam.Repository;


import com.example.MusicAppTeam.Model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<UserModel,Long> {
    UserModel findByEmail(String email);


}
