package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Board;
import org.assertj.core.api.Assertions;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class GameServiceImplTest {
    @Autowired
    GameService gameService;

    @Autowired
    Board board;

    @Test
    // 보물섬 위치 지정
    public void setPirateTreasure() {
        // given
        int[] treasures = gameService.setPirateTreasure();
        // when
        boolean result = (treasures != null);
        // then
        assertTrue(result);
    }

    @Test
    // 해적 시작위치 지정
    public void initPirateStart() {
        //given
        int result = gameService.initPirateStart(gameService.initPirateRandomStart());
        // when
        List<Integer> pirateList = new ArrayList<>();
        for (int element : board.getTreasures()) {
            pirateList.add(element);
        }
        // then
        Assertions.assertThat(pirateList.contains(result))
                .isTrue();
    }

    @Test
    // 해군 시작위치 지정
    public void initMarineStart() {
        // given
        for (int i = 1; i <= 3; i++) {
            gameService.initMarineStart(i, gameService.initMarineStartRandom(i)[i]);
        }

        int[] result = board.getCurrentPosition();

        // when
        List<Integer> marineList = new ArrayList<>();
        for (int element : board.getMarineStartList()) {
            marineList.add(element);
        }

        // then
        Assertions.assertThat(marineList)
                .contains(result[1], result[2], result[3]);
    }

    @Test
    // 해적 이동 가능 위치 조회 (해군 포함시 해당 경로 이동 불가한지 검사)
    public void findPirateAvailableNode() {
        // 검사1 : 모든 해적 위치 경우의 수 검사
        for (int i = 1; i <= 188; i++) {
            HashMap<Integer, Stack<Integer>> pirateMovableNode =  gameService.findPirateAvailableNode(i);
            // 기존 검사 완료 하였음 (로그 출력 정리 위해 주석처리)
            // System.out.println(pirateMovableNode);
        }

        // 검사2 : 해군이 길을 가로막고 있는 경우, 해당 경로를 우회한 길을 안내하는지 검사
        // 51 - 256 - 267 - 52 이동 불가능함
        board.getCurrentPosition()[1] = 256;
        Stack<Integer> check1 = new Stack<>();
        check1.push(51);
        check1.push(256);
        check1.push(267);
        check1.push(52);
        Assertions.assertThat(gameService.findPirateAvailableNode(51).get(52).equals(check1))
                .isFalse();

        // 51 -> 52 이동 불가능함
        board.getCurrentPosition()[1] = 256;
        board.getCurrentPosition()[2] = 257;
        board.getCurrentPosition()[3] = 243;
        Assertions.assertThat(gameService.findPirateAvailableNode(51).containsKey(2))
                .isFalse();
    }
}
