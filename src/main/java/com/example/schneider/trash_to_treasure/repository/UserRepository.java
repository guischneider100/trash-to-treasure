package com.example.schneider.trash_to_treasure.repository;

import com.example.schneider.trash_to_treasure.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    // Additional query methods can be defined here if needed
}
