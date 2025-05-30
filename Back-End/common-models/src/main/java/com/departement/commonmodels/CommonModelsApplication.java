package com.departement.commonmodels;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@RequestMapping
public class CommonModelsApplication {
	@GetMapping("/commonmodels")
	public String commonModels() {
		return "Hello Common Models";
	}

	public static void main(String[] args) {
		SpringApplication.run(CommonModelsApplication.class, args);
	}

}
