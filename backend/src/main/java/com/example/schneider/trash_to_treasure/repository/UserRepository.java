package com.example.schneider.trash_to_treasure.repository;

import com.example.schneider.trash_to_treasure.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    // Additional query methods can be defined here if needed

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
