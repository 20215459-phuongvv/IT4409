package com.IT4409.backend.controllers;

import com.IT4409.backend.dtos.AuthDTO.AuthDTO;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.BadRequestException;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.security.JwtTokenProvider;
import com.IT4409.backend.services.CartService;
import com.IT4409.backend.services.UserDetailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserDetailService userDetailService;
    @Autowired
    private CartService cartService;

    @PostMapping("/signup")
    public ResponseEntity<AuthDTO> createUser(@Valid @RequestBody User user) throws Exception {
        String email = user.getEmail();
        String password = user.getPassword();
        String role = user.getRole();
        if(userRepository.existsByEmail(email)) {
            throw new BadRequestException("email.validate.duplicate");
        }
        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setRole(role);
        newUser = userRepository.save(newUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        AuthDTO authDTO = new AuthDTO(token, true);
        return new ResponseEntity<>(authDTO, HttpStatus.OK);
    }
}
