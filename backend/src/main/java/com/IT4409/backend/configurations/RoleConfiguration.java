package com.IT4409.backend.configurations;

import com.IT4409.backend.services.RoleService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleConfiguration {
    @Bean
    public RoleService roleService(){
        return new RoleService();
    }
}
