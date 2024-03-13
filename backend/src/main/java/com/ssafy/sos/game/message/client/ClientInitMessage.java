package com.ssafy.sos.game.message.client;

import lombok.Data;

@Data
public class ClientInitMessage {
    private String gameId;
    private String sender;
    private String message;
    private int node;
}
