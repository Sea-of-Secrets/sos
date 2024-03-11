package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final Board board;

    @Override
    public int[] setPirateTreasure() {
        int[] treasures = new int[4];
        Random rand = new Random();
        int randomIndex;

        // 랜덤하게 선택할 배열 선택
        int[] selectedArray;
        int index = 0;
        int[][] allArrays = {board.getOne(), board.getTwo(), board.getThree(), board.getFour()};
        for (int[] allArray : allArrays) {
            selectedArray = allArray;
            randomIndex = rand.nextInt(selectedArray.length);
            treasures[index] = selectedArray[randomIndex];
            index++;
        }

        System.out.println(Arrays.toString(treasures));
        board.setTreasures(treasures);
        return treasures;
    }

    // 해적 시작위치 지정
    @Override
    public int initPirateStart() {
        int[] treasures = board.getTreasures();
        System.out.println("treasure = " + Arrays.toString(treasures));
        Random rand = new Random();

        return treasures[rand.nextInt(4)];
    }

    @Override
    public int[] initMarineStart() {
        int[] marineStartList = board.getMarineStartList();
        Collections.shuffle(Arrays.asList(marineStartList));
        int[] startNode = {marineStartList[0], marineStartList[1], marineStartList[2]};
        return startNode;
    }
}
