package com.ssafy.sos.user.domain;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@RedisHash("TodayVisited")
@Builder
@Getter
public class TodayVisited {
    @Id
    private Long id;
    private LocalDateTime visitedTime;
}
