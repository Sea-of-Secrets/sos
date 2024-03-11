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

    // 해적 이동 가능 위치 조회
    @Override
    public int[] findPirateAvailableNode(int nodeNumber) {
        int[][] graph = board.getGraph();
        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[374];
        ArrayList<Integer> result = new ArrayList<>();

        queue.add(nodeNumber);
        visited[nodeNumber] = true;

        while (!queue.isEmpty()) {
            int now = queue.poll();
            for (int next : graph[now]) {
                // 방문하지 않은 노드라면
                if (!visited[next]) {
                    // 해적이라면 (하얀 점이라면)
                    if (next <= 199) {
                        result.add(next);
                    }
                    // 해군이라면 (검은 점이라면)
                    else {
                        queue.add(next);
                    }
                    visited[next] = true;
                }
            }
        }
        // 정렬
        result.sort(Comparator.naturalOrder());
        // result(ArrayList)를 배열로 바꾸기
        return result.stream()
                .mapToInt(i -> i)
                .toArray();
    }

    // 해군 시작 위치 랜덤 지정
    @Override
    public int[] initMarineStart() {
        int[] marineStart = board.getMarineStartList();
        List<Integer> marineStartList = new ArrayList<>();
        for (int node : marineStart) {
            marineStartList.add(node);
        }
        Collections.shuffle(marineStartList);
        return new int[]{marineStartList.get(0), marineStartList.get(1), marineStartList.get(2)};
    }

    // 해군 이동 가능 위치 조회
    @Override
    public int[] findMarineAvailableNode(int nodeNumber) {
        // 현재 자리에서 bfs를 돌면서

        // 0~2칸 이동 가능하다 (단, 하얀점을 칸수로 세지 않음)

        // 0~2칸 내의 모든 노드가 이동 가능한 노드 (단, 하얀칸은 칸수로 세지 않음)
    }
}
