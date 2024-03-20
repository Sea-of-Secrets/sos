package com.ssafy.sos.game.domain;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Room {
    private String gameId;
    private String host;
    private List<String> inRoomPlayers; // key: nickname / value: 렌더 완료 여부
    private String gameMode;
    private int isRendered = 0;

    public Room(String gameId) {
        this.gameId = gameId;
        this.inRoomPlayers = new ArrayList<>();
    }

    public void increaseIsRendered() {
        this.isRendered += 1;
    }
}
