package com.ssafy.sos.member.jwt;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.RedisKeyValueAdapter;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

import java.util.concurrent.TimeUnit;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "refresh_token")
@EnableRedisRepositories(enableKeyspaceEvents = RedisKeyValueAdapter.EnableKeyspaceEvents.ON_STARTUP)
public class RefreshToken {

    @Id
    private Long userId;

    @Indexed
    private String token;

    private String role;

    @TimeToLive(unit = TimeUnit.MILLISECONDS)
    private long ttl;

    public RefreshToken update(String token, long ttl) {
        this.token = token;
        this.ttl = ttl;
        return this;
    }

}
