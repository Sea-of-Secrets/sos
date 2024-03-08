package com.ssafy.sos.game;

import lombok.Data;

@Data
public class ClientMessage {
    //프론트에서 보내는 내용들 추가
    private String gameId;
    private String sender;
    private String message;
}
