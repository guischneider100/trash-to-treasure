package com.example.schneider.trash_to_treasure.dto;

import jakarta.validation.constraints.NotNull;

public class ItemFavoriteDTO {
    
    public class Response {
    
        private Integer id;
        private Integer userId;
        private Integer itemId;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public Integer getItemId() {
            return itemId;
        }

        public void setItemId(Integer itemId) {
            this.itemId = itemId;
        }
    }
    
    public class Create {

        @NotNull
        private Integer userId;

        @NotNull
        private Integer itemId;

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public Integer getItemId() {
            return itemId;
        }

        public void setItemId(Integer itemId) {
            this.itemId = itemId;
        }
    }
}
