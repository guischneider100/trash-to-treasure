package com.example.schneider.trash_to_treasure.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.schneider.trash_to_treasure.dto.AuthResponseDTO;
import com.example.schneider.trash_to_treasure.dto.PasswordDTO;
import com.example.schneider.trash_to_treasure.dto.UserDTO;
import com.example.schneider.trash_to_treasure.security.CustomUserDetails;
import com.example.schneider.trash_to_treasure.service.UserService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthResponseDTO.Login loginRequest) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO.Token> register(@RequestBody @Valid UserDTO.Create userCreateDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(userCreateDTO));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO.Response> me(Authentication authentication) {
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        UserDTO.Response userCreated = userService.findByEmail(user.getUsername());

        return ResponseEntity.ok(userCreated);
    }

    @PostMapping("/change-password")
    public void changePassword(@RequestBody @Valid PasswordDTO.ChangePassword changePassword) {
        userService.changePassword(changePassword.oldPassword(), changePassword.newPassword(), changePassword.confirmPassword());
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody @Valid PasswordDTO.ForgotPassword resetPassword) {
        userService.forgotPassword(resetPassword.email());
    }

    @PostMapping("/verify-forgot-password-code")
    public void verifyForgotPasswordCode(@RequestBody @Valid PasswordDTO.VerifyCode resetPasswordDTO) {
        userService.verifyForgotPasswordCode(resetPasswordDTO.email(), resetPasswordDTO.code());
    }

    @PatchMapping("/new-password")
    public void defineNewPassword(@RequestBody @Valid PasswordDTO.NewPassword resetPasswordDTO) {
        userService.defineNewPassword(resetPasswordDTO.email(), resetPasswordDTO.code(), resetPasswordDTO.newPassword());
    }
}
