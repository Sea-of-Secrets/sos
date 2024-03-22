package com.ssafy.sos.game.domain;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "game_records")
@Data
@AllArgsConstructor
@Builder
public class GameMember {
    @Id
    private String id;
    private String username;
    private List<GameRecord> gameRecords;
}