package com.ssafy.sos.game.repository;

import com.ssafy.sos.game.domain.GameMember;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameMemberRepository extends MongoRepository<GameMember, String> {
    Optional<GameMember> findByUsername(String username);
}