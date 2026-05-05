package com.example.schneider.trash_to_treasure.dto;

import java.time.Instant;

import com.example.schneider.trash_to_treasure.entity.ItemCondition;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ItemDTO {
    
    public static class Response {
    
        private Long id;
        private String title;
        private String description;
        private String photoUrl;
        private ItemCondition condition;
        private Double latitude;
        private Double longitude;
        private Instant postedAt;
        private Long postedByUserId;
        private Long collectedByUserId;
        private boolean isFavorite;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
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

        public Instant getPostedAt() {
            return postedAt;
        }

        public void setPostedAt(Instant postedAt) {
            this.postedAt = postedAt;
        }

        public Long getPostedByUserId() {
            return postedByUserId;
        }

        public void setPostedByUserId(Long postedByUserId) {
            this.postedByUserId = postedByUserId;
        }

        public Long getCollectedByUserId(){
            return collectedByUserId;
        }

        public void setCollectedByUserId(Long collectedByUserId) {
            this.collectedByUserId = collectedByUserId;
        }

        public boolean getIsFavorite(){
            return isFavorite;
        }

        public void setIsFavorite(boolean isFavorite){
            this.isFavorite = isFavorite;
        }
    }

    public static class Create {
    
        @NotBlank
        private String title;

        private String description;

        @NotNull
        private ItemCondition condition;

        @NotNull
        private Double latitude;

        @NotNull
        private Double longitude;

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
    }

    public static class Update {
    
        private String title;

        private String description;

        private String photoUrl;

        private ItemCondition condition;
        
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
    }
}
