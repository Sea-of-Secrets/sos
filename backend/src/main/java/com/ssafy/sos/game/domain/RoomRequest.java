package com.ssafy.sos.game.domain;

import com.ssafy.sos.game.util.GameMode;
import lombok.Data;

@Data
public class RoomRequest {
    private String nickname;
    private String gameId;
    private GameMode gameMode;
}
