package com.departement.profdep;

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
@EntityScan(basePackages = { "com.departement.commonmodels.entities", "com.departement.profdep.entities" })
@EnableJpaRepositories(basePackages = { "com.departement.profdep.repositories" })
public class ProfDepApplication {
    @GetMapping("/profdep")
    public String profdep() {
        return "Hello ProfDep";
    }

    public static void main(String[] args) {
        SpringApplication.run(ProfDepApplication.class, args);
    }

}
