package com.ssafy.sos;

import com.ssafy.sos.game.controller.MessageController;
import com.ssafy.sos.game.domain.Board;
import com.ssafy.sos.game.domain.Game;
import com.ssafy.sos.game.message.client.ClientInitMessage;
import com.ssafy.sos.game.service.GameService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MessageSendingTests {
    @Mock
    private Board board;
    @Mock
    private GameService gameService;
    @Mock
    private SimpMessageSendingOperations sendingOperations;
    @InjectMocks
    private MessageController messageController;

    private final String gameId = "A710";

    @BeforeEach
    public void initGameMap() {
        board.getGameMap().put(gameId, new Game());
    }

    @Test
    public void testInit() throws Exception {
        // Given
        ClientInitMessage message = new ClientInitMessage();
        message.setGameId(gameId);
        message.setMessage("INIT_PIRATE_START");

        // When Then
        messageController.init(message);

        // Then
        System.out.println(board.getGameMap());
    }
}
