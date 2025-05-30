package com.departement.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@RequestMapping()
public class AuthApplication {
	@GetMapping("/auth")
	public String auth() {
		return "Hello Auth";
	}

	@GetMapping("/")
	public String home() {
		return "Common Models Service is running";
	}

	public static void main(String[] args) {
		SpringApplication.run(AuthApplication.class, args);
	}

}
