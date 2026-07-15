package com.example.schneider.trash_to_treasure.service;

import java.security.SecureRandom;
import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.schneider.trash_to_treasure.dto.AuthResponseDTO;
import com.example.schneider.trash_to_treasure.dto.UserDTO;
import com.example.schneider.trash_to_treasure.entity.Roles;
import com.example.schneider.trash_to_treasure.entity.User;
import com.example.schneider.trash_to_treasure.mapper.UserMapper;
import com.example.schneider.trash_to_treasure.repository.UserRepository;
import com.example.schneider.trash_to_treasure.security.CustomUserDetails;
import com.example.schneider.trash_to_treasure.security.JwtUtil;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final LoginAttemptService loginAttemptService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final ForgotPasswordAttemptService forgotPasswordAttemptService;

    public UserService(UserRepository userRepository, UserMapper userMapper, LoginAttemptService loginAttemptService,
            AuthenticationManager authenticationManager, JwtUtil jwtUtil, EmailService emailService,
            PasswordEncoder passwordEncoder, ForgotPasswordAttemptService forgotPasswordAttemptService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.loginAttemptService = loginAttemptService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.forgotPasswordAttemptService = forgotPasswordAttemptService;
    }

    public AuthResponseDTO.Token register(UserDTO.Create useCreateDTO) {

        if (userRepository.existsByEmail(useCreateDTO.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }

        User user = userMapper.toEntity(useCreateDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Roles.ROLE_USER);

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponseDTO.Token(token, userMapper.toDTO(userRepository.save(user)));
    }

    public AuthResponseDTO.Token login(AuthResponseDTO.Login loginRequest) {

        loginAttemptService.checkBlocked(loginRequest.email());

        try {
            // Authenticates the user
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
            );

            loginAttemptService.logginSuccess(loginRequest.email());
        } catch (BadCredentialsException e) {
            loginAttemptService.loginFailed(loginRequest.email());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        // Generates the token based on the username
        String token = jwtUtil.generateToken(loginRequest.email());

        UserDTO.Response user = findByEmail(loginRequest.email());

        return new AuthResponseDTO.Token(token, user);
    }

    public UserDTO.Response save(UserDTO.Create userCreateDTO) {
        User user = userRepository.save(userMapper.toEntity(userCreateDTO));
        return userMapper.toDTO(user);
    }

    public UserDTO.Response findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        return userMapper.toDTO(user);
    }

    public UserDTO.Response findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        return userMapper.toDTO(user);
    }

    public UserDTO.Response update(Long id, UserDTO.Create userNewData) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        // Update Entity with DTO data
        userMapper.updateEntityFromDTO(userNewData, existingUser);

        return userMapper.toDTO(userRepository.save(existingUser));
    }

    public void deleteById() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        userRepository.deleteById(user.getId());
    }

    public void softDeleteById() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails authenticatedUser = (CustomUserDetails) auth.getPrincipal();

        User user = userRepository.findById(authenticatedUser.getId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        user.setDeletedAt(Instant.now());

        userRepository.save(user);
    }

    public void forgotPassword(String email) {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        SecureRandom secureRandom = new SecureRandom();

        int code = 100000 + secureRandom.nextInt(900000);

        existingUser.setRecoveryCodeHash(passwordEncoder.encode(String.valueOf(code)));
        existingUser.setRecoveryCodeExpiresAt(Instant.now().plusSeconds(60 * 10));

        try {
            emailService.sendRecoverCode(email, String.valueOf(code));

            userRepository.save(existingUser);
        } catch (Exception e) {
            System.out.println("error to send email");
        }
    }

    public void verifyForgotPasswordCode(String email, String code) {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        forgotPasswordAttemptService.checkBlocked(email);
        
        isTokenValid(existingUser, code);
    }

    public void defineNewPassword(String email, String code, String newPassword) {
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if (isTokenValid(existingUser, code))
            existingUser.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(existingUser);
    }

    public User getByIdOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
    }

    private boolean isTokenValid(User existingUser, String code) {
        if (!(passwordEncoder.matches(code, existingUser.getRecoveryCodeHash())
                && Instant.now().isBefore(existingUser.getRecoveryCodeExpiresAt()))) {

            forgotPasswordAttemptService.definePasswordFailed(existingUser.getEmail());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        forgotPasswordAttemptService.definePasswordSuccess(existingUser.getEmail());

        return true;
    }

    public void changePassword(String oldPassword, String newPassword, String confirmPassword) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails customUser = (CustomUserDetails) auth.getPrincipal();

        System.out.println(passwordEncoder.encode(oldPassword) + " / " + customUser.getPassword());

        if(!passwordEncoder.matches(oldPassword, customUser.getPassword()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");

        System.out.println(newPassword + " / " + confirmPassword);
        
        if(!newPassword.equals(confirmPassword))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords don't match");

        User user = getByIdOrThrow(customUser.getId());
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
