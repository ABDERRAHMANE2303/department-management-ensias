package com.departement.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping()
@EntityScan(basePackages = { "com.departement.commonmodels.entities", "com.departement.auth.entities" })
@EnableJpaRepositories(basePackages = { "com.departement.auth.repositories" })
public class AuthApplication {
	@GetMapping("/auth")
	public String auth() {
		return "Hello Auth";
	}

	public static void main(String[] args) {
		SpringApplication.run(AuthApplication.class, args);
	}

}
