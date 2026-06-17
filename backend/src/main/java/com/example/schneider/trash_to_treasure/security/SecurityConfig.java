package com.example.schneider.trash_to_treasure.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.schneider.trash_to_treasure.service.CustomUserDetailsService;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) //Desactivates CSRF protection (not necessary for REST API)
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //Without session (JWT)
            .authenticationProvider(authenticationProvider())
            .authorizeHttpRequests(auth -> 
                                   
                                   // -- ** Public endpoints ** --
                                   auth.requestMatchers("/api/auth/login").permitAll() //Allows login
                                   .requestMatchers("/api/auth/register").permitAll() //Allows registration
                                   .requestMatchers(HttpMethod.POST, "/api/auth/forgot-password").permitAll()
                                   .requestMatchers(HttpMethod.POST, "/api/auth/verify-forgot-password-code").permitAll()
                                   .requestMatchers(HttpMethod.PATCH, "/api/auth/new-password").permitAll()
                                   .requestMatchers(HttpMethod.POST, "/api/item").permitAll() //Allows POST from items
                                   .requestMatchers("/actuator/health").permitAll()
                                   
                                   .anyRequest().authenticated()) //Requests token for the rest
            
                                 //Authorizes any request (DEV ONLY)
                                 //.authorizeHttpRequests(auth ->
                                 //auth.requestMatchers("/**").permitAll())
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class); //Add filters before default authentication

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(authenticationProvider());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();

        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }
}
