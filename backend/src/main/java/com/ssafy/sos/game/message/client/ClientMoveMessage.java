package com.ssafy.sos.game.message.client;

import lombok.Data;

@Data
public class ClientMoveMessage {
    private String gameId;
    private String sender;
    private String message;
    private int node;
    private String action;
}
