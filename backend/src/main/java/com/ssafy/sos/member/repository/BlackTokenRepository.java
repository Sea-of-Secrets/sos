package com.ssafy.sos.member.repository;

import com.ssafy.sos.member.jwt.BlackToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlackTokenRepository extends CrudRepository<BlackToken, String> {
    BlackToken findByToken(String token);
}
