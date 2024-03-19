package com.ssafy.sos.member.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JWTUtil {

    private Key key;

    public JWTUtil(@Value("${spring.jwt.secret}")String secret) {


        byte[] byteSecretKey = Decoders.BASE64.decode(secret);
        key = Keys.hmacShaKeyFor(byteSecretKey);
    }

    public String getUsername(String token) {

        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("username", String.class);
    }

    public String getRole(String token) {

        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("role", String.class);
    }

    public Boolean isExpired(String token) {

        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration().before(new Date());
    }

    public String createJwt(String category, String username, String role, Long expiredMs) {

        Claims claims = Jwts.claims();
        claims.put("category", category);
        claims.put("username", username);
        claims.put("role", role);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getCategory(String token) {
        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return jws.getBody().get("category", String.class);
        } catch (JwtException e) {
           return null;
        }
    }
//
//    public RefreshToken save(String username, String refresh) {
//        //redis에 저장
//        UserEntity userEntity = userRepository.findByUsername(username);
//        RefreshToken refreshToken = new RefreshToken();
//        refreshToken.setUserId(userEntity.getId());
//        refreshToken.setRole(userEntity.getRole());
//        refreshToken.setToken(refresh);
//        refreshToken.setTtl(86400000L);
//
//        return refreshTokenRepository.save(refreshToken);
//    }
}