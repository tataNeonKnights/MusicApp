package com.example.MusicAppTeam.Controller;


import com.example.MusicAppTeam.Model.UserModel;
import com.example.MusicAppTeam.Service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class UsersController {

    private UsersService usersService;

    public UsersController(UsersService usersService) {
        super();
        this.usersService = usersService;
    }

    @PostMapping("/adduser")
    public ResponseEntity<UserModel> addUser(@RequestBody UserModel userModel){
        return new ResponseEntity<UserModel>(usersService.saveUser(userModel), HttpStatus.CREATED);
    }

    @GetMapping("/getusers")
    public List<UserModel> getUsers()
    {
        return usersService.getAllUsers();
    }


}
