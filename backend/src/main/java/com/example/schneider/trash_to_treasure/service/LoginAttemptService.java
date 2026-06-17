package com.example.schneider.trash_to_treasure.service;

import java.time.Duration;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LoginAttemptService {
    
    private static final int MAX_ATTEMPTS = 5;
    private static final long BLOCK_TIME_MINUTES = 15;

    private final RedisTemplate<String, Object> redisTemplate;

    public LoginAttemptService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    private String key(String email) {
        return ("login:attempts:" + email);
    }

    public void logginSuccess(String email){
        redisTemplate.delete("login:attempts:" + email);
    }

    public void loginFailed(String email) {
        String key = key(email);

        Long attempts = redisTemplate.opsForValue().increment(key);

        if (attempts != null && attempts == 1) {
            redisTemplate.expire(key, Duration.ofMinutes(BLOCK_TIME_MINUTES));
        }
    }

    public void checkBlocked(String email) {
        String key = key(email);

        Object value = redisTemplate.opsForValue().get(key);

        if (value != null && Integer.parseInt(value.toString()) >= MAX_ATTEMPTS) {
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Too many login attempts");
        }
    }
}
