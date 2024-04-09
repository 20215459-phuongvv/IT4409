package com.IT4409.backend.services;

import com.IT4409.backend.entities.User;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.security.JwtTokenProvider;
import com.IT4409.backend.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Override
    public List<User> findAllUsers() {
        return userRepository.findAllByOrderByCreatedAtDesc();
    }
    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {
        System.out.println("user service");
        String email = jwtTokenProvider.getEmailFromJwtToken(jwt);
        System.out.println("email"+email);
        User user = userRepository.findByEmail(email);
        if(user==null) {
            throw new NotFoundException("user not exist with email "+email);
        }
        System.out.println("email user"+user.getEmail());
        return user;
    }
}
