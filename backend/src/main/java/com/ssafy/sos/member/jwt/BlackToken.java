package com.ssafy.sos.member.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "black_token")
public class BlackToken {
    @Id
    private String token;

    private boolean isBlacked;

    @TimeToLive
    private long ttl;
}
