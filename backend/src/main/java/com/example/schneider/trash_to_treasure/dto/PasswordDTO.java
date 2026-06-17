package com.example.schneider.trash_to_treasure.dto;

import jakarta.validation.constraints.NotBlank;

public class PasswordDTO {

    public record ForgotPassword(
        @NotBlank
        String email
    ) {}


    public record VerifyCode(
        @NotBlank
        String email,

        @NotBlank
        String code
    ) {}

    public record NewPassword(
        @NotBlank
        String email,

        @NotBlank
        String code,

        @NotBlank
        String newPassword
    ) {}

    public record ChangePassword(
        @NotBlank
        String oldPassword,

        @NotBlank
        String newPassword,

        @NotBlank
        String confirmPassword
    ) {}
}
