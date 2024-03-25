package com.ssafy.sos.game.message.server;

import com.ssafy.sos.game.domain.Game;
import com.ssafy.sos.game.domain.Room;
import lombok.Builder;
import lombok.Data;

import java.util.Deque;
import java.util.HashMap;

@Data
@Builder
public class ServerMarineMessage {
    private String gameId;
    private String message;
    private Game game;
    private Room room;
    private HashMap<Integer, Deque<Integer>> marineAvailableNode;
}
