package com.departement.cheffil;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping
@EntityScan(basePackages = { "com.departement.commonmodels.entities", "com.departement.cheffil.entities" })
@EnableJpaRepositories(basePackages = { "com.departement.cheffil.repositories" })
public class ChefFilApplication {
    @GetMapping("/cheffil")
    public String cheffil() {
        return "Hello cheffil";
    }

    public static void main(String[] args) {
        SpringApplication.run(ChefFilApplication.class, args);
    }

}
