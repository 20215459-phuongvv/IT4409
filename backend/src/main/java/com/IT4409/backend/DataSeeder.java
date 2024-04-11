package com.IT4409.backend;

import com.IT4409.backend.Utils.UserRole;
import com.IT4409.backend.entities.User;
import com.IT4409.backend.repositories.UserRepository;
import com.IT4409.backend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public void run(String...args) {
        String adminUsername = "admin";
        if (userRepository.findByEmail(adminUsername).isEmpty()) {
            User adminUser = new User();
            adminUser.setPassword(passwordEncoder.encode("admin"));
            adminUser.setEmail(adminUsername);
            adminUser.setRole(UserRole.ADMIN.toString());
            adminUser.setCreatedAt(LocalDateTime.now());
            User admin = userRepository.save(adminUser);
            cartService.createCart(admin);
        }
    }
}
