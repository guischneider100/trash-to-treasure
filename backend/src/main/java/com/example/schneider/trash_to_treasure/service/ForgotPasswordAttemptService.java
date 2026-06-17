package com.example.schneider.trash_to_treasure.service;

import java.time.Duration;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ForgotPasswordAttemptService {

    private static final int MAX_ATTEMPTS = 3;
    private static final long BLOCK_TIME_MINUTES = 10;
    
    private final RedisTemplate<String, Object> redisTemplate;

    public ForgotPasswordAttemptService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    private String key(String email) {
        return ("forgotpassword:attempts:" + email);
    }

    public void definePasswordSuccess(String email) {
        redisTemplate.delete("forgotpassword:attempts:" + email);
    }

    public void definePasswordFailed(String email) {
        String key = key(email);

        Long attempts = redisTemplate.opsForValue().increment(key);

        if(attempts != null && attempts == 1) {
            redisTemplate.expire(key, Duration.ofMinutes(BLOCK_TIME_MINUTES));
        }
    }

    public void checkBlocked(String email) {
        String key = key(email);

        Object value = redisTemplate.opsForValue().get(key);

        if(value != null && Integer.parseInt(value.toString()) >= MAX_ATTEMPTS) {
            throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Too many code checks");
        }
    }
}
