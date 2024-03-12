package com.ssafy.sos.game.domain;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Data
public class Game {
    private String gameId;
    // 0: 해적, 1: 해군1, 2: 해군2, 3: 해군3
    private int[] currentPosition; // players의 현재 위치
    private HashMap<String, Integer> players; // players의 닉네임 : 역할
    private int[] treasures; // 해적이 가야할 보물 위치
    private List<Integer> pirateRoute; // 해적 이동 경로
    private List<Integer> marineOneRoute; // 해군1 이동 경로
    private List<Integer> marineTwoRoute; // 해군2 이동 경로
    private List<Integer> marineThreeRoute; // 해군3 이동 경로
    private int turn; // 현재 턴
    private int round; // 현재 라운드

    public Game() {
        this.currentPosition = new int[] {0, 0, 0, 0};
        this.treasures = new int[] {0, 0, 0, 0};
        this.pirateRoute = new ArrayList<>();
        this.marineOneRoute = new ArrayList<>();
        this.marineTwoRoute = new ArrayList<>();
        this.marineThreeRoute = new ArrayList<>();
        players = new HashMap<>();
    }

}
