package com.ssafy.sos.game.domain;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class GameRecord {
    @Id
    private Long id;
    private String thieve;
    private String[] navy;
    private List<Integer> nodes;
    private boolean victory;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int point;
}
