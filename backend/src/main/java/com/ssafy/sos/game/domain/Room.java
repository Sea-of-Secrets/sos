package com.ssafy.sos.game.domain;

import com.ssafy.sos.game.util.GameMode;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Room {
    private String gameId;
    private Player host;
    private List<Player> inRoomPlayers;
    private GameMode gameMode;
    private int isRendered = 0;

    public Room(String gameId) {
        this.gameId = gameId;
        this.inRoomPlayers = new ArrayList<>();
    }

    public void increaseIsRendered() {
        this.isRendered += 1;
    }
}
