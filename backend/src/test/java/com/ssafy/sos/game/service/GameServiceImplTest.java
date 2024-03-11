package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Board;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class GameServiceImplTest {
    @Autowired
    GameService gameService;
    @Autowired
    Board board;

    @Test
//    @Transactional
    public void setPirateTreasure() throws Exception {
        // given
        int[] treasures = gameService.setPirateTreasure();

        // when
        boolean result = (treasures != null);

        // then
        assertTrue(result);
    }

}