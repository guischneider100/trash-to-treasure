package com.example.schneider.trash_to_treasure.dto;

import jakarta.validation.constraints.NotNull;

public class UserDTO {
    
    public static class Response{
        
        private Integer id;
        private String email;
        private String password;
        private String mobile;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getUsername() {
            return email;
        }

        public void setUsername(String email) {
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

    public static class Create {
    
        @NotNull
        private String email;

        @NotNull
        private String password;

        @NotNull
        private String mobile;

        public String getUsername() {
            return email;
        }

        public void setUsername(String email) {
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
