package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Board;
import org.assertj.core.api.Assertions;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class GameServiceImplTest {
    @Autowired
    GameService gameService;

    @Autowired
    Board board;

    @Test
    public void 보물섬_위치_지정() {
        // given
        int[] treasures = gameService.setPirateTreasure();

        // when
        boolean result = (treasures != null);

        // then
        assertTrue(result);
    }

    @Test
    public void 해적_시작위치_지정() {
        //given
        int result = gameService.initPirateStart();
        System.out.println("result = " + result);

        // when
        int[] check = board.getTreasures();

        List<Integer> pirateList = new ArrayList<>();
        for (int element : check) {
            pirateList.add(element);
        }

        // then
        Assertions.assertThat(pirateList.contains(result))
                .isTrue();
    }

    @Test
    public void 해군_시작위치_지정() {
        // given
        int[] result = gameService.initMarineStart();
        System.out.println(Arrays.toString(result));

        // when
        int[] marines = board.getMarineStartList();
        System.out.println(Arrays.toString(marines));

        List<Integer> marineList = new ArrayList<>();
        for (int element : marines) {
            marineList.add(element);
        }

        // then
        Assertions.assertThat(marineList.contains(result[0]))
                .isTrue();
    }

    // 이후 해군 위치 검사하는 테스트 추가되어야 함
    @Test
    public void 해적_이동가능위치_탐색() {
        for (int i = 1; i <= 188; i++) {
            int[] result = gameService.findPirateAvailableNode(i);
            System.out.println("현재위치: " + i + " result: " + Arrays.toString(result));
        }
    }
}