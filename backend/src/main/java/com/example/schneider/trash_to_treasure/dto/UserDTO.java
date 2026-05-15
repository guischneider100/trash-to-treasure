package com.example.schneider.trash_to_treasure.dto;

import jakarta.validation.constraints.NotNull;

public class UserDTO {
    
    public static class Response{
        
        private Long id;
        private String email;
        private String mobile;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getMobile() {
            return mobile;
        }

        public void setMobile(String mobile) {
            this.mobile = mobile;
        }
    }

    public static class Create {
    
        @NotNull
        private String email;

        @NotNull
        private String password;

        @NotNull
        private String mobile;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getMobile() {
            return mobile;
        }

        public void setMobile(String mobile) {
            this.mobile = mobile;
        }
    }
}
