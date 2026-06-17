package com.example.schneider.trash_to_treasure.dto;

import jakarta.validation.constraints.NotBlank;

public class AuthResponseDTO {
    
    public record Token(
        String token,
        UserDTO.Response user
    ) {}

    public record Login(
        @NotBlank
        String email,

        @NotBlank
        String password
    ) {}
}
