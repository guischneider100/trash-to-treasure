package com.example.schneider.trash_to_treasure.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.schneider.trash_to_treasure.dto.AuthResponseDTO;
import com.example.schneider.trash_to_treasure.dto.ResetPasswordDTO;
import com.example.schneider.trash_to_treasure.dto.UserDTO;
import com.example.schneider.trash_to_treasure.security.CustomUserDetails;
import com.example.schneider.trash_to_treasure.security.JwtUtil;
import com.example.schneider.trash_to_treasure.service.UserService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public static class LoginRequest {
        public String email;
        public String password;
    }

    AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            //Authenticates the user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email, loginRequest.password)
            ); 

            //Generates the token based on the username
            String token = jwtUtil.generateToken(loginRequest.email);

            UserDTO.Response user = userService.findByEmail(loginRequest.email);

            return ResponseEntity.ok(new AuthResponseDTO(token, user));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody @Valid UserDTO.Create userCreateDTO){
        UserDTO.Response userCreated = userService.register(userCreateDTO);

        String token = jwtUtil.generateToken(userCreated.getEmail());

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponseDTO(token, userCreated));
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO.Response> me(Authentication authentication) {
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        UserDTO.Response userCreated = userService.findByEmail(user.getUsername());

        return ResponseEntity.ok(userCreated);
    }

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody ResetPasswordDTO resetPassword) {
        userService.forgotPassword(resetPassword.email());
    }

    @PostMapping("/verify-forgot-password-code")
    public void verifyForgotPasswordCode(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        userService.verifyForgotPasswordCode(resetPasswordDTO.email(), resetPasswordDTO.code());
    }

    @PatchMapping("/new-password")
    public void defineNewPassword(@RequestBody ResetPasswordDTO resetPasswordDTO) {
        userService.defineNewPassword(resetPasswordDTO.email(), resetPasswordDTO.code(), resetPasswordDTO.newPassword());
    }
}
