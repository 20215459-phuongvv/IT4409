package com.IT4409.backend.configurations;

import com.IT4409.backend.services.DiscountCodeService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DiscountCodeConfiguration {
    @Bean
    public DiscountCodeService discountCodeService(){
        return new DiscountCodeService();
    }
}
