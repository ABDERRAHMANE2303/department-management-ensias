package com.departement.chefdep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping
public class ChefDepApplication {
    @GetMapping("/chefdep")
    public String chefdep() {
        return "Hello ChefDep";
    }

    public static void main(String[] args) {
        SpringApplication.run(ChefDepApplication.class, args);
    }

}
