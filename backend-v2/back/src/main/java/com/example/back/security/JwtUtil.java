package com.example.back.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final static String ACCESS_TOKEN_SECRET = "0523TDPRON1C07LAED1021PT_GRUPO8_PROYECTO_INTEGRADOR";
    private final static Long ACCESS_TOKEN_VALIDITY_SECONDS= 5400L;

    public static  String createToken(String nombre, String email){
        SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

        long expirationTime = ACCESS_TOKEN_VALIDITY_SECONDS * 1000L;
        Date expirationDate = new Date(System.currentTimeMillis()+expirationTime);

        Map<String, Object> extra = new HashMap<>();
        extra.put("nombre", nombre);

        SecretKey key = Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setSubject(email)
                .setExpiration(expirationDate)
                .addClaims(extra)
                .signWith(key)
                .compact();
    }

    public static UsernamePasswordAuthenticationToken getAuthentication(String token){
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(ACCESS_TOKEN_SECRET.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            String email = claims.getSubject();
            return new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
        }
        catch (JwtException e){
            return null;
        }
    }

}
