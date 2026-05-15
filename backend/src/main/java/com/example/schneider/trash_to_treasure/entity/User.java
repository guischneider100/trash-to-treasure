package com.example.schneider.trash_to_treasure.entity;

import java.time.Instant;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private String mobile;

    @Column(name = "recovery_code_hash")
    private String recoveryCodeHash;

    @Column(name = "recovery_code_expires_at")
    private Instant recoveryCodeExpiresAt;

    //Remove all related items from this user
    @OneToMany(mappedBy = "postedBy", cascade = CascadeType.REMOVE)
    private List<Item> items;

    //Returns the authorities (roles or permissions) granted to the user.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.<GrantedAuthority>emptyList();
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return email;
    }

    public void setUsername(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRecoveryCodeHash() {
        return recoveryCodeHash;
    }

    public void setRecoveryCodeHash(String recoveryCodeHash) {
        this.recoveryCodeHash = recoveryCodeHash;
    }

    public Instant getRecoveryCodeExpiresAt() {
        return recoveryCodeExpiresAt;
    }

    public void setRecoveryCodeExpiresAt(Instant recoveryCodeExpiresAt) {
        this.recoveryCodeExpiresAt = recoveryCodeExpiresAt;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
