package com.ssafy.sos.game.event;

import com.ssafy.sos.game.domain.Player;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

import java.time.Clock;

@Getter
public class MatchingEvent extends ApplicationEvent {
    private String gameId;
    private Player playerOne;
    private Player playerTwo;

    public MatchingEvent(Object source, String gameId, Player playerOne, Player playerTwo) {
        super(source);
        this.gameId = gameId;
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
    }
}
