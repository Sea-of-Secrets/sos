package com.ssafy.sos.game.domain;

import com.ssafy.sos.game.util.GameMode;
import com.ssafy.sos.game.util.GameStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class Game {
    private String gameId;
    // 0: 해적, 1: 해군1, 2: 해군2, 3: 해군3
    private int[] currentPosition; // players의 현재 위치
    private HashMap<Integer, Player> players; // 역할 : player 객체 정보
    private HashMap<Integer, Boolean> treasures; // 해적이 가야할 보물 위치
    private List<Integer> pirateRoute; // 해적 이동 경로
    private List<Integer> marineOneRoute; // 해군1 이동 경로
    private List<Integer> marineTwoRoute; // 해군2 이동 경로
    private List<Integer> marineThreeRoute; // 해군3 이동 경로
    private int turn; // 현재 턴
    private int round; // 현재 라운드
    private Investigate investigate; // 조사 진행 상태 및 성공 여부
    private GameStatus gameStatus; // 현재 게임 진행 상태 (시작 전, 진행 중, 게임 종료)
    private List<Integer> investigateSuccess; // 해군이 조사 성공한 노드 리스트
    private GameMode gameMode; // 1:1 모드, 1:3 모드
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    public Game(String gameId) {
        this.gameId = gameId;
        this.currentPosition = new int[] {0, 0, 0, 0};
        this.treasures = new HashMap<>();
        this.pirateRoute = new ArrayList<>();
        this.marineOneRoute = new ArrayList<>();
        this.marineTwoRoute = new ArrayList<>();
        this.marineThreeRoute = new ArrayList<>();
        this.turn = 1;
        this.round = 1;
        this.players = new HashMap<>();
        this.investigate = new Investigate();
        this.gameStatus = GameStatus.BEFORE_START;
        this.investigateSuccess = new ArrayList<>();
        this.gameMode = GameMode.ONE_VS_THREE;
    }

    public void increaseTurn() {
        this.turn++;
    }

    public void increaseRound() {
        this.round++;
    }

    public Integer getPlayerRoleByNickname(String nickname) {
        for (Map.Entry<Integer, Player> entry : players.entrySet()) {
            if (entry.getValue().getNickname().equals(nickname)) {
                return entry.getKey();
            }
        }
        return null; // 해당 닉네임을 가진 Player가 없는 경우
    }
}
