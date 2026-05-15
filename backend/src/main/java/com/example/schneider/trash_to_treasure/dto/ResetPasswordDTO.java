package com.example.schneider.trash_to_treasure.dto;

public record ResetPasswordDTO (
    String email,
    String code,
    String newPassword
) {}
