package com.example.schneider.trash_to_treasure.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.schneider.trash_to_treasure.entity.User;
import com.example.schneider.trash_to_treasure.repository.UserRepository;
import com.example.schneider.trash_to_treasure.security.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                                  .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials with email: " + email));

        return new CustomUserDetails(user.getId(),
                                    user.getEmail(),
                                    user.getPassword(),
                                    java.util.Collections.emptyList());
    }
}
