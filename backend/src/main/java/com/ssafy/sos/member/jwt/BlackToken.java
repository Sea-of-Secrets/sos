package com.ssafy.sos.member.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.RedisKeyValueAdapter;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.concurrent.TimeUnit;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "black_token")
@EnableRedisRepositories(enableKeyspaceEvents = RedisKeyValueAdapter.EnableKeyspaceEvents.ON_STARTUP)
public class BlackToken {
    @Id
    private String token;

    private boolean isBlacked;

    @TimeToLive(unit = TimeUnit.MILLISECONDS)
    private long ttl;

    public static long calcTTL(long exp) {
        // 현재 시간을 한국 표준시(KST)로 가져오기
        ZonedDateTime currentDateTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        long currentMillis = currentDateTime.toInstant().toEpochMilli();

        // exp 값 밀리초 단위로 변환
        return (exp * 1000) - currentMillis;
    }
}
