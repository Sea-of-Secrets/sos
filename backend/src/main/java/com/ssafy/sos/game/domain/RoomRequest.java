package com.ssafy.sos.game.domain;

import lombok.Data;

@Data
public class RoomRequest {
    private String nickname;
    private String gameId;
    private String gameMode;
}
