package com.example.schneider.trash_to_treasure.security;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.security.Key;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    //Key to sign the token
    private final String SECRET_KEY = System.getenv("JWT_SECRET");
    
    private Key getSignInKey(){
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
        return new SecretKeySpec(keyBytes, 0, keyBytes.length, "HmacSHA256");
    }

    //Generates the token for the user
    public String generateToken(String username){
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }
    
    //Creates the token with claims and expiration time
    private String createToken(Map<String, Object> claims, String subject){
        long expirationTime = 1000 * 60 * 60 * 10; //10 hours
        return Jwts.builder()
                   .setClaims(claims)
                   .setSubject(subject)
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                   .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                   .compact();
    }

    //Extract the username from the token
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    //Check if the token is valid for the username
    public boolean validateToken(String token, String username){
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    //Check if the token is expired
    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    //Extract the expiration date
    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    //Extract any claim from the token
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    //Excract all the claims from the token
    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                   .setSigningKey(getSignInKey())
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }
}
