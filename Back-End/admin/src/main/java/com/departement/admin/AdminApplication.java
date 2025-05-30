package com.departement.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping
public class AdminApplication {
    @GetMapping("/admin")
    public String admin() {
        return "Hello Admin";
    }

    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }

}
