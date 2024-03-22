package com.ssafy.sos.game.repository;

import com.ssafy.sos.game.domain.record.GameRecordMember;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameMemberRepository extends MongoRepository<GameRecordMember, String> {
    Optional<GameRecordMember> findByUsername(String username);
}