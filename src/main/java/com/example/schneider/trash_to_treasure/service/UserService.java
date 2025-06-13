package com.example.schneider.trash_to_treasure.service;

import org.springframework.stereotype.Service;

import com.example.schneider.trash_to_treasure.dto.UserDTO;
import com.example.schneider.trash_to_treasure.entity.User;
import com.example.schneider.trash_to_treasure.mapper.UserMapper;
import com.example.schneider.trash_to_treasure.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper){
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDTO.Response save(UserDTO.Create userCreateDTO){
        User user = userRepository.save(userMapper.toEntity(userCreateDTO));
        return userMapper.toDTO(user);
    }

    public UserDTO.Response findById(Integer id){
        User user = userRepository.findById(id)
                                  .orElseThrow(() -> new RuntimeException("User not found"));

        return userMapper.toDTO(user);
    }

    public UserDTO.Response update(Integer id, UserDTO.Create userNewData){
        User existingUser = userRepository.findById(id)
                                  .orElseThrow(() -> new RuntimeException("User not found"));
        
        //Update Entity with DTO data
        userMapper.updateEntityFromDTO(userNewData, existingUser);
        
        return userMapper.toDTO(userRepository.save(existingUser));
    }

    public void deleteById(Integer id){
        userRepository.deleteById(id);
    }
}
