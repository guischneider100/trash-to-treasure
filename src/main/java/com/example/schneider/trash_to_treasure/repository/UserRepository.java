package com.example.schneider.trash_to_treasure.repository;

import com.example.schneider.trash_to_treasure.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    // Additional query methods can be defined here if needed

    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);
}
