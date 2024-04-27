package com.IT4409.backend.controllers;

import com.IT4409.backend.entities.User;
import com.IT4409.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("admin/users")
    public ResponseEntity<?> getAllUsers(){
        try{
            List<User> user=userService.findAllUsers();
            return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
    @GetMapping("/users/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String jwt){
        try {
            User user = userService.findUserByJwt(jwt);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/users/change-password")
    public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String jwt, String newPassword) {
        try{
            User user = userService.changePassword(jwt, newPassword);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
