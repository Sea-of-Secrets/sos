package com.ssafy.sos.game.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Chat {
    private String gameId;
    private String sender;
    private int role;
    private String message;
    private String chatMessage;
    private LocalDateTime sendDate;

    @Builder
    public Chat(String gameId, String sender, int role, String message, String chatMessage) {
        this.gameId = gameId;
        this.sender = sender;
        this.role = role;
        this.message = message;
        this.chatMessage = chatMessage;
        this.sendDate = LocalDateTime.now();
    }
}
