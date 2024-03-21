package com.ssafy.sos.game.service;

import lombok.*;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class TimerTimeoutEvent extends ApplicationEvent {
    private String gameId;
    private String message;
    private int timerType;

    public TimerTimeoutEvent(Object source, String gameId, String message, int timerType) {
        super(source);
        this.gameId = gameId;
        this.message = message;
        this.timerType = timerType;
    }
}
