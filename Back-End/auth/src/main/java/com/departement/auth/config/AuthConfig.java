package com.departement.auth.config;

import com.departement.commonmodels.utils.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthConfig {

    @Bean
    public JwtUtil jwtUtil() {
        return new JwtUtil();
    }
}