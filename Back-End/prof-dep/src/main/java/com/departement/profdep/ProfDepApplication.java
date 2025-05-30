package com.departement.profdep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping
public class ProfDepApplication {
    @GetMapping("/profdep")
    public String profdep() {
        return "Hello ProfDep";
    }

    @GetMapping("/")
    public String home() {
        return "Common Models Service is running";
    }

    public static void main(String[] args) {
        SpringApplication.run(ProfDepApplication.class, args);
    }

}
