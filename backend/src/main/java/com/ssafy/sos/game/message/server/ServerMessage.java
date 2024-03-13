package com.ssafy.sos.game.message.server;

import com.ssafy.sos.game.domain.Game;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ServerMessage {
    private String gameId;
    private String message;
    private Game game;
}
