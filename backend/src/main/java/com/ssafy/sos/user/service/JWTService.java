package com.ssafy.sos.user.service;

import com.ssafy.sos.user.jwt.BlackToken;
import com.ssafy.sos.user.jwt.RefreshToken;
import com.ssafy.sos.user.domain.UserEntity;
import com.ssafy.sos.user.repository.BlackTokenRepository;
import com.ssafy.sos.user.repository.RefreshTokenRepository;
import com.ssafy.sos.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JWTService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final BlackTokenRepository blackTokenRepository;

    public RefreshToken save(String username, String refresh) {
        //redis에 저장
        UserEntity userEntity = userRepository.findByUsername(username);
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUserId(userEntity.getId());
        refreshToken.setRole(userEntity.getRole());
        refreshToken.setToken(refresh);
        refreshToken.setTtl(86400000L);

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }


    public BlackToken blackTokenSave(BlackToken blackToken) {
        return blackTokenRepository.save(blackToken);
    }

    public BlackToken blackFindByToken(String refresh) {
        return blackTokenRepository.findByToken(refresh);
    }
}
