package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.AuthDTO.AuthRequestDTO;
import com.IT4409.backend.dtos.AuthDTO.AuthResponseDTO;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.security.JwtTokenProvider;
import com.IT4409.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) throws Exception {
        try {
            AuthResponseDTO authResponseDTO= userService.createUser(user);
            return new ResponseEntity<>(authResponseDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }
    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody AuthRequestDTO authRequestDTO) throws Exception{
        try {
            AuthResponseDTO authResponseDTO= userService.signIn(authRequestDTO);
            return new ResponseEntity<>(authResponseDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
