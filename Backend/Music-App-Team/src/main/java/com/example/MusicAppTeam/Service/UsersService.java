package com.example.MusicAppTeam.Service;

import com.example.MusicAppTeam.Model.UserModel;
import com.example.MusicAppTeam.Repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {

    private UsersRepository usersRepository;


    public UsersService(UsersRepository usersRepository) {
        super();
        this.usersRepository = usersRepository;
    }

    public UserModel saveUser(UserModel userModel)
    {
        return usersRepository.save(userModel);
    }

    public List<UserModel> getAllUsers()
    {
        return usersRepository.findAll();
    }

    public UserModel getUserById(long id){
        return usersRepository.findById(id).orElseThrow(()-> new Error("error not found"));
    }
    public UserModel getUserByEmail(UserModel user){
        return usersRepository.findByEmail(user.getEmail());
    }

}
