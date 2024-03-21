package com.ssafy.sos.member.repository;

import com.ssafy.sos.member.jwt.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

    RefreshToken findByToken(String token);
    RefreshToken findByUserId(String userId);
}
