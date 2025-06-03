package com.departement.admin.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.*;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class FileUploadController {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Map<String, String> upload(@RequestParam("file") MultipartFile file) throws Exception {
        // Create directory if it doesn't exist
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
            System.out.println("Created directory: " + directory.getAbsolutePath());
        }

        // Generate unique filename
        String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Path target = Paths.get(uploadDir).resolve(filename);

        // Save the file
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        System.out.println("Saved file to: " + target.toAbsolutePath());

        // Return the URL path
        return Collections.singletonMap("path", "/uploads/" + filename);
    }
}