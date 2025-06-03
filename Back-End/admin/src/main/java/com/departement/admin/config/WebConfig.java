package com.departement.admin.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // Default value as fallback
    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Make sure we use the absolute path
        File uploadDirFile = new File(uploadDir);
        String absolutePath = uploadDirFile.getAbsolutePath();

        // Debug output
        System.out.println("Serving uploads from: " + absolutePath);

        // Register the resource handler
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + absolutePath + File.separator);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                // allow all origins (including credentials) via patterns
                .allowedOriginPatterns("*")
                .allowCredentials(false) // <-- change to false
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}