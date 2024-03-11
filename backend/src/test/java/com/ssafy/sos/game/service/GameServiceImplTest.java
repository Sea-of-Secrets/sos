package com.ssafy.sos.game.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;

@SpringBootTest
class GameServiceImplTest {
    @Autowired
    GameService gameService;
    @Test
    void 보물섬_위치_설정() {
        gameService.setPirateTreasure();
    }

    @Test
    void 해적_시작위치_지정() {
        //given
        int result = gameService.initPirateStart();
        System.out.println("result = " + result);

        // when
        int[] check = {12, 13, 14, 15};

        // then
        Assertions.assertThat(Arrays.asList(check).contains(result))
                .isFalse();
    }
}