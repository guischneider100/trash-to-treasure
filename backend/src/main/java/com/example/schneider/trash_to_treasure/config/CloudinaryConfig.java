package com.example.schneider.trash_to_treasure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CloudinaryConfig {

    private final String CLOUDINARY_API_KEY = System.getenv("CLOUDINARY_API_KEY");
    private final String CLOUDINARY_API_SECRET = System.getenv("CLOUDINARY_API_SECRET");
    
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dvhcasvqj",
                "api_key", CLOUDINARY_API_KEY,
                "api_secret", CLOUDINARY_API_SECRET
            )
        );
    }
}
