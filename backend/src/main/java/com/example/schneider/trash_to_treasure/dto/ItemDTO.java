package com.example.schneider.trash_to_treasure.dto;

import java.time.LocalDateTime;

import com.example.schneider.trash_to_treasure.entity.ItemCondition;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ItemDTO {
    
    public static class Response {
    
        private Integer id;
        private String title;
        private String description;
        private String photoUrl;
        private ItemCondition condition;
        private Double latitude;
        private Double longitude;
        private boolean taken = false;
        private LocalDateTime postedAt;
        private Integer postedByUserId;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getPhotoUrl() {
            return photoUrl;
        }

        public void setPhotoUrl(String photoUrl) {
            this.photoUrl = photoUrl;
        }

        public ItemCondition getCondition() {
            return condition;
        }

        public void setCondition(ItemCondition condition) {
            this.condition = condition;
        }

        public Double getLatitude() {
            return latitude;
        }

        public void setLatitude(Double latitude) {
            this.latitude = latitude;
        }

        public Double getLongitude() {
            return longitude;
        }

        public void setLongitude(Double longitude) {
            this.longitude = longitude;
        }

        public boolean isTaken() {
            return taken;
        }

        public void setTaken(boolean taken) {
            this.taken = taken;
        }

        public LocalDateTime getPostedAt() {
            return postedAt;
        }

        public void setPostedAt(LocalDateTime postedAt) {
            this.postedAt = postedAt;
        }

        public Integer getPostedByUserId() {
            return postedByUserId;
        }

        public void setPostedByUserId(Integer postedByUserId) {
            this.postedByUserId = postedByUserId;
        }
    }

    public static class Create {
    
        @NotBlank
        private String title;

        private String description;

        private String photoUrl;

        @NotNull
        private ItemCondition condition;

        @NotNull
        private Double latitude;

        @NotNull
        private Double longitude;

        @NotNull
        private Integer postedByUserId;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getPhotoUrl() {
            return photoUrl;
        }

        public void setPhotoUrl(String photoUrl) {
            this.photoUrl = photoUrl;
        }

        public ItemCondition getCondition() {
            return condition;
        }

        public void setCondition(ItemCondition condition) {
            this.condition = condition;
        }

        public Double getLatitude() {
            return latitude;
        }

        public void setLatitude(Double latitude) {
            this.latitude = latitude;
        }

        public Double getLongitude() {
            return longitude;
        }

        public void setLongitude(Double longitude) {
            this.longitude = longitude;
        }

        public Integer getPostedByUserId() {
            return postedByUserId;
        }

        public void setPostedByUserId(Integer postedByUserId) {
            this.postedByUserId = postedByUserId;
        }
    }

    public static class Update {
    
        @NotBlank
        private String title;

        private String description;

        private String photoUrl;

        @NotNull
        private ItemCondition condition;

        @NotNull
        private boolean taken;
        
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getPhotoUrl() {
            return photoUrl;
        }

        public void setPhotoUrl(String photoUrl) {
            this.photoUrl = photoUrl;
        }

        public ItemCondition getCondition() {
            return condition;
        }

        public void setCondition(ItemCondition condition) {
            this.condition = condition;
        }

        public boolean isTaken() {
            return taken;
        }

        public void setTaken(boolean taken) {
            this.taken = taken;
        }
    }
}
