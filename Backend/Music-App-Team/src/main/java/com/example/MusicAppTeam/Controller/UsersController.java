package com.example.MusicAppTeam.Controller;


import com.example.MusicAppTeam.Model.UserModel;
import com.example.MusicAppTeam.Service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.lang.Error;

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
    @PostMapping("/signin")
    public UserModel signin(@RequestBody UserModel user){
        UserModel addedUser=usersService.getUserByEmail(user);
        if(addedUser!=null){
            if(addedUser.getPassword().equals(user.getPassword())){
                addedUser.setPassword(null);
                return addedUser;
            }else{
                return null;
            }

        }else{
            return null;
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable("id") long id){
       try{
           UserModel userModel =usersService.getUserById(id);

               userModel.setPassword(null);
               return new ResponseEntity<UserModel>(userModel,HttpStatus.OK);

       }catch (Error err){
           return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
       }
    }


}
