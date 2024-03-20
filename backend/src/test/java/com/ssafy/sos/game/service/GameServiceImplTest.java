package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Board;
import com.ssafy.sos.game.domain.Game;
import com.ssafy.sos.game.domain.Room;
import org.assertj.core.api.Assertions;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest
class GameServiceImplTest {
    @Autowired
    GameService gameService;

    @Autowired
    Board board;

    Game game;

    // 테스트용 gameId
    String gameId = "A710";

    @BeforeEach
    public void initGameMap() {
        board.getGameMap().put(gameId, new Game(gameId));
    }

    @Test
    // 보물섬 위치 지정
    public void setPirateTreasure() {
        // given
        int[] treasures = gameService.setPirateTreasure(gameId);
        // when
        boolean result = (treasures != null);
        // then
        assertTrue(result);
    }

    @Test
    // 해적 시작위치 지정
    public void initPirateStart() {
        //given
        int result = gameService.initPirateStart(gameId, gameService.initPirateRandomStart(gameId));
        // when
        List<Integer> pirateList = new ArrayList<>();
        game = board.getGameMap().get(gameId);
        for (int element : game.getTreasures()) {
            pirateList.add(element);
        }
        // then
        Assertions.assertThat(pirateList.contains(result))
                .isTrue();
    }

    @Test
    // 해군 시작위치 지정
    public void initMarineStart() {
        // 검사1 : 앞서 선택한 해군이 없을때
        // given
        for (int i = 1; i <= 3; i++) {
            gameService.initMarineStart(gameId, i, gameService.initMarineStartRandom(gameId, i)[i]);
        }

        game = board.getGameMap().get(gameId);
        int[] result = game.getCurrentPosition();

        // when
        List<Integer> marineList = new ArrayList<>();
        for (int element : board.getMarineStartList()) {
            marineList.add(element);
        }

        // then
        Assertions.assertThat(marineList)
                .contains(result[1], result[2], result[3]);

        // 검사2 : 앞서 선택한 해군이 있을때 (해당 번호는 선택이 되면 안됨)
        // 수동 검사
        game.getCurrentPosition()[1] = 93;
        Assertions.assertThat(gameService.initMarineStart(gameId, 2, 93))
                .isEqualTo(null);

        // 랜덤 검사
        game.getCurrentPosition()[1] = 93;
        game.getCurrentPosition()[2] = 94;
        List<Integer> check = new ArrayList<>();
        check.add(97);
        check.add(106);
        check.add(109);
        check.add(200);
        for (int i = 0; i < 100; i++) {
            gameService.initMarineStartRandom(gameId, 3);
            Assertions.assertThat(check).contains(game.getCurrentPosition()[3]);
        }
    }

    @Test
    // 해적 이동 가능 위치 조회 (해군 포함시 해당 경로 이동 불가한지 검사)
    public void findPirateAvailableNode() {
        // 검사1 : 모든 해적 위치 경우의 수 검사
        for (int i = 1; i <= 188; i++) {
            HashMap<Integer, Deque<Integer>> pirateMovableNode =  gameService.findPirateAvailableNode(gameId, i);
            // 기존 검사 완료 하였음 (로그 출력 정리 위해 주석처리)
            // System.out.println(pirateMovableNode);
        }

        // 검사2 : 특정 노드에서의 해적 이동 가능 위치 조회 결과가 올바르게 나오는지 검사
        // 169의 경우
        Assertions.assertThat(gameService.findPirateAvailableNode(gameId, 169))
                .containsKeys(146, 148, 170, 171, 187, 188);

        // 91의 경우
        Assertions.assertThat(gameService.findPirateAvailableNode(gameId, 91))
                .containsKeys(74, 75, 87, 88, 89, 90, 92, 109);

        // 검사3 : 해군이 길을 가로막고 있는 경우, 해당 경로를 우회한 길을 안내하는지 검사
        // 51 - 256 - 267 - 52 이동 불가능함
        game = board.getGameMap().get(gameId);
        game.getCurrentPosition()[1] = 256;
        Stack<Integer> check1 = new Stack<>();
        check1.push(51);
        check1.push(256);
        check1.push(267);
        check1.push(52);
        Assertions.assertThat(gameService.findPirateAvailableNode(gameId, 51).get(52).equals(check1))
                .isFalse();

        // 51 -> 52 이동 불가능함
        game.getCurrentPosition()[1] = 256;
        game.getCurrentPosition()[2] = 257;
        game.getCurrentPosition()[3] = 243;
        Assertions.assertThat(gameService.findPirateAvailableNode(gameId, 51).containsKey(2))
                .isFalse();
    }

    @Test
    // 해군 이동 가능 위치 조회 (다른 해군이 서있을 시 해당 정점 도착 불가한지 검사)
    public void findMarineAvailableNode() {
        // 검사1 : 다른 해군이 포함되지 않은 모든 이동가능한 경로 검증
        game = board.getGameMap().get(gameId);

        for (int i = 201; i <= 373; i++) {
            HashMap<Integer, Deque<Integer>> marineMovableNode =  gameService.findMarineAvailableNode(gameId, i);
            // 기존 검사 완료 하였음 (로그 출력 정리 위해 주석처리)
            // System.out.println(marineMovableNode);
        }

        // 검사2 : 다른 해군이 포함된 경우 해당 정점은 선택할 수 없음
        game.getCurrentPosition()[1] = 259;
        game.getCurrentPosition()[2] = 284;

        // 259번, 284번이 포함되어서는 안됨
        Assertions.assertThat(gameService.findMarineAvailableNode(gameId, 270))
                .doesNotContainKeys(259, 284);

        // 검사3 : 이동 가능한 경로 여러개일 때 최단 경로 이동하는지 검사
        List<Integer> check = new ArrayList<>();
        check.add(201);
        check.add(215);
        // 201 - 215로 이동해야함 (반례: 201 - 8 - 214 - 215)
        Assertions.assertThat(gameService.findMarineAvailableNode(gameId, 201).get(215))
                .isEqualTo(check);

        check.clear();
        check.add(262);
        check.add(273);
        // 262-273로 이동해야함 (반례: 262 - 43 - 263 - 60 - 273)
        Assertions.assertThat(gameService.findMarineAvailableNode(gameId, 262).get(273))
                .isEqualTo(check);
    }

    @Test
    public void move() {
        game = board.getGameMap().get(gameId);

        // 해적 이동 - 해군 노드로 이동하려는 경우
        Assertions.assertThat(gameService.move(gameId, 200, 0)).isFalse();

        // 해군1 이동 - 정상 이동
        gameService.move(gameId, 201, 1);
        List<Integer> marineOneRoute = game.getMarineOneRoute();
        Assertions.assertThat(marineOneRoute.get(marineOneRoute.size()-1) == 201).isTrue();

        // 해군2 이동 - 해적 노드로 이동하려는 경우
        Assertions.assertThat(gameService.move(gameId, 1, 2)).isFalse();

    }

    @Test
    public void makeRoom() {
        // gameMap에 이미 방 아이디가 꽉 찼을 때 -> 더 이상 방을 못 만들게 해야 함
        for (char c = 'A'; c <= 'Z'; c++) {
            // 숫자 000부터 999까지 반복문으로 생성
            for (int i = 0; i <= 999; i++) {
                // 숫자를 세 자리 문자열로 변환하여 출력
                String number = String.format("%03d", i);
                String roomNumber = c + number;
                board.getGameMap().put(roomNumber, new Game(roomNumber));
            }
        }

        assertThrows(RuntimeException.class, () -> gameService.makeRoom("nickname", "ONE_VS_ONE"));
    }

    @Test
    public void enterRoom() {
        // 이미 생성되어 있는 방에만 입장할 수 있음
        Room room = gameService.makeRoom("Player1", "ONE_VS_ONE");
        Room result = gameService.enterRoom(room.getGameId(), "Player2");

        Assertions.assertThat(result.getInRoomPlayers().contains("Player2")).isTrue();
    }

    @Test
    public void getInvestigateList() {
        // given
        game = board.getGameMap().get(gameId);
        int nodeNumber = 273;

        // when
        int[] adjList = Arrays.stream(board.getGraph()[nodeNumber])
                .filter(adjacentNode -> adjacentNode < 200)
                .toArray();
        int[] comp1 = new int[]{60, 76, 262, 274};
        int[] comp2 = new int[]{60, 76};

        // then
        Assertions.assertThat(Arrays.equals(adjList, comp1)).isFalse();
        Assertions.assertThat(Arrays.equals(adjList, comp2)).isTrue();

    }

    @Test
    public void investigate() {
        // given
        game = board.getGameMap().get(gameId);

        int nodeNumber = 76;
        game.getPirateRoute().add(76);
        game.getCurrentPosition()[1] = 273;

        // when
        boolean result = gameService.investigate(gameId, nodeNumber, 1);

        // then
        Assertions.assertThat(result).isTrue();
    }

    @Test
    public void arrest() {
        // given
        game = board.getGameMap().get(gameId);
        game.getCurrentPosition()[0] = 1;

        // when
        boolean result = gameService.arrest(gameId, 1);

        // then
        Assertions.assertThat(result).isTrue();
    }

}
