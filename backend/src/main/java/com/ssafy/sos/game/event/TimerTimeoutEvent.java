package com.ssafy.sos.game.event;

import lombok.*;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class TimerTimeoutEvent extends ApplicationEvent {
    private String gameId;
    private String message;

    public TimerTimeoutEvent(Object source, String gameId, String message) {
        super(source);
        this.gameId = gameId;
        this.message = message;
    }
}
