package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Random;

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
            treasures[index] = randomIndex;
            index++;
        }

        System.out.println(Arrays.toString(treasures));
        return treasures;
    }
}
