package com.ssafy.sos.game.domain;

import lombok.Data;

import java.util.HashMap;

@Data
public class Room {
    private String gameId;
    private String host;
    private HashMap<String, Boolean> inRoomPlayers; // key: nickname / value: 렌더 완료 여부
    private String gameMode;

    public Room(String gameId) {
        this.gameId = gameId;
        this.inRoomPlayers = new HashMap<>();
    }
}
