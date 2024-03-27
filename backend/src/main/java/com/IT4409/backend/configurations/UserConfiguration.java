package com.IT4409.backend.configurations;

import com.IT4409.backend.services.UserService;
import com.IT4409.backend.services.interfaces.IUserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfiguration {
    @Bean
    public UserService userService(){
        return new UserService();
    }
}
