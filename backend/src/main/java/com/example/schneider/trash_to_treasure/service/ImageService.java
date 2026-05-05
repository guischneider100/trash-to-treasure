package com.example.schneider.trash_to_treasure.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class ImageService {
    
    private final Cloudinary cloudinary;

    public ImageService(Cloudinary cloudinary){
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile file) {
        try {
            Map uploadFile = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

            return uploadFile.get("secure_url").toString();
        } catch (Exception e) {
            throw new RuntimeException("Error trying to upload file: " + e);
        }
    }
}
