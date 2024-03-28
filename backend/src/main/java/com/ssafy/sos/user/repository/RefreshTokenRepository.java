package com.ssafy.sos.user.repository;

import com.ssafy.sos.user.jwt.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

    RefreshToken findByToken(String token);
    RefreshToken findByUserId(String userId);
}
