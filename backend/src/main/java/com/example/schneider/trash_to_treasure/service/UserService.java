package com.example.schneider.trash_to_treasure.service;

import java.security.SecureRandom;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.schneider.trash_to_treasure.dto.ResetPasswordDTO;
import com.example.schneider.trash_to_treasure.dto.UserDTO;
import com.example.schneider.trash_to_treasure.entity.User;
import com.example.schneider.trash_to_treasure.mapper.UserMapper;
import com.example.schneider.trash_to_treasure.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDTO.Response register(UserDTO.Create useCreateDTO){
        if(userRepository.existsByEmail(useCreateDTO.getEmail())){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }

        User user = userMapper.toEntity(useCreateDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userMapper.toDTO(userRepository.save(user));
    }

    public UserDTO.Response save(UserDTO.Create userCreateDTO){
        User user = userRepository.save(userMapper.toEntity(userCreateDTO));
        return userMapper.toDTO(user);
    }

    public UserDTO.Response findById(Long id){
        User user = userRepository.findById(id)
                                  .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        return userMapper.toDTO(user);
    }

    public UserDTO.Response findByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        return userMapper.toDTO(user);
    }

    public UserDTO.Response update(Long id, UserDTO.Create userNewData){
        User existingUser = userRepository.findById(id)
                                  .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        
        //Update Entity with DTO data
        userMapper.updateEntityFromDTO(userNewData, existingUser);
        
        return userMapper.toDTO(userRepository.save(existingUser));
    }

    public void deleteById(Long id){
        userRepository.deleteById(id);
    }

    public void forgotPassword(String email){
        User existingUser = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

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
        User existingUser = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        isTokenValid(existingUser, code);
    }

    public void defineNewPassword(String email, String code, String newPassword) {
        User existingUser = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if(isTokenValid(existingUser, code))
            existingUser.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(existingUser);
    }

    public User getByIdOrThrow(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
    }

    private boolean isTokenValid(User existingUser, String code) {
        if(!(passwordEncoder.matches(code, existingUser.getRecoveryCodeHash()) && Instant.now().isBefore(existingUser.getRecoveryCodeExpiresAt()))){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        return true;
    }
}
