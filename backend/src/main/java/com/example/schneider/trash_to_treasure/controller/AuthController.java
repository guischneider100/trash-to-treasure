package com.example.schneider.trash_to_treasure.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.schneider.trash_to_treasure.dto.UserDTO;
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

    public static class LoginRequest{
        public String username;
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
                new UsernamePasswordAuthenticationToken(loginRequest.username, loginRequest.password)
            ); 

            //Generates the token based on the username
            String token = jwtUtil.generateToken(loginRequest.username);

            return ResponseEntity.ok(token);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO.Response> register(@RequestBody @Valid UserDTO.Create userCreateDTO){
        return new ResponseEntity<>(userService.register(userCreateDTO), HttpStatus.CREATED);
    }
}
