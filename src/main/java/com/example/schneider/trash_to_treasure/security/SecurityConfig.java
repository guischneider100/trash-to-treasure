package com.example.schneider.trash_to_treasure.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
    
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) //Desactivates CSRF protection (not necessary for REST API)
            .authorizeHttpRequests(auth -> 
                                   auth.requestMatchers("/api/auth/**").permitAll() //Allows login and registration
                                   .requestMatchers(HttpMethod.GET, "/api/item/**").permitAll() //Allows GET from items
                                   .requestMatchers(HttpMethod.POST, "/api/item").permitAll() //Allows POST from items
                                   .requestMatchers("/api/item_favorite/**").authenticated() //Protects all the info about favorites
                                   .requestMatchers(HttpMethod.PUT, "/api/item/**").authenticated()
                                   .requestMatchers(HttpMethod.DELETE, "/api/item/**").authenticated() //Protects all updates and deletes
                                   .anyRequest().authenticated()) //Requests token for the rest
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //Withou session (JWT)
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); //Add filters before default authentication

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager (AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
