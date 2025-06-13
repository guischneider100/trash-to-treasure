package com.example.schneider.trash_to_treasure.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.schneider.trash_to_treasure.dto.UserDTO;
import com.example.schneider.trash_to_treasure.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/api/user")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    //Request to save the user
    @PostMapping
    public ResponseEntity<UserDTO.Response> save(@RequestBody @Valid UserDTO.Create userCreateDTO){
        return new ResponseEntity<>(userService.save(userCreateDTO), HttpStatus.CREATED);
    }

    //Request to find the user by id
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO.Response> findById(@PathVariable Integer id){
        return ResponseEntity.ok(userService.findById(id));
    }
    
    //Request to update the user by id
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO.Response> update(@PathVariable Integer id, @RequestBody @Valid UserDTO.Create userCreateDTO){
        return ResponseEntity.ok(userService.update(id, userCreateDTO));
    }

    //Request to delete the user by id
    @DeleteMapping
    public ResponseEntity<UserDTO.Response> delete(@PathVariable Integer id){
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
