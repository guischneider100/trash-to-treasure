package com.example.schneider.trash_to_treasure.dto;

public record AuthResponseDTO (
    String token,
    UserDTO.Response user
) {}
