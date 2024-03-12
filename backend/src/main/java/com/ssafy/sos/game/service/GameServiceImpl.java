package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Board;
import com.sun.jna.platform.win32.WinBase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final Board board;

    // 보물섬 위치 랜덤 지정
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

        board.setTreasures(treasures);
        return treasures;
    }

    // 해적 시작위치 수동지정
    @Override
    public int initPirateStart(int selectedNode) {
        board.getCurrentPosition()[0] = selectedNode;
        return selectedNode;
    }

    // 해적 시작위치 랜덤지정
    @Override
    public int initPirateRandomStart() {
        int[] treasures = board.getTreasures();
        Random rand = new Random();
        int nextNode = treasures[rand.nextInt(4)];
        // getCurrentPosition 배열의 해적 위치[0]
        board.getCurrentPosition()[0] = nextNode;
        return nextNode;
    }

    // 해적 이동 가능 위치 조회
    @Override
    public HashMap<Integer, Stack<Integer>> findPirateAvailableNode(int nodeNumber) {
        int[][] graph = board.getGraph();
        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[374];
        ArrayList<Integer> result = new ArrayList<>();
        int[] currentPosition = board.getCurrentPosition();

        queue.add(nodeNumber);
        visited[nodeNumber] = true;

        while (!queue.isEmpty()) {
            int now = queue.poll();
            for (int next : graph[now]) {
                // 방문하지 않은 노드라면
                if (!visited[next]) {
                    // 이 자리에 해군이 서있다면 (이동 불가)
                    if (currentPosition[1] == next || currentPosition[2] == next || currentPosition[3] == next) {
                        visited[next] = true;
                        continue;
                    }

                    // 해적 노드라면 (하얀 점이라면)
                    if (next <= 199) {
                        result.add(next);
                    }
                    // 해군 노드라면 (검은 점이라면)
                    else {
                        queue.add(next);
                    }
                    visited[next] = true;
                }
            }
        }
        // result(ArrayList)를 배열로 바꾸기
        int[] availableNode = result.stream()
                .mapToInt(i -> i)
                .toArray();

        // 최종 반환할 해시맵
        HashMap<Integer, Stack<Integer>> resultMap = new HashMap<>();

        // 각각의 이동가능한 노드를 DFS 돌며 경로추적
        for (int node : availableNode) {
            Stack<Integer> stack = new Stack<>();
            boolean[] stackVisited = new boolean[374];
            stack.push(nodeNumber);
            stackVisited[nodeNumber] = true;
            while(!stack.isEmpty()) {
                int now = stack.peek();
                // 현재 위치가 종료 지점이라면 break
                if (now == node) {
                    break;
                }
                boolean hasChild = false;
                for (int next : graph[now]) {
                    // 해군이 해당 노드에 서있을 경우 || 이미 방문한 노드의 경우
                    if (currentPosition[1] == next || currentPosition[2] == next || currentPosition[3] == next || stackVisited[next]) {
                        continue;
                    }
                    // 해적 노드(하얀점)의 경우 이동 불가
                    if (next != node && next != nodeNumber && next <= 199) {
                        continue;
                    }
                    stack.push(next);
                    stackVisited[next] = true;
                    hasChild = true;
                    break;
                }
                if (!hasChild) {
                    stack.pop();
                }
            }
            // 경로
            resultMap.put(node, stack);
        }
        // System.out.println("resultMap = " + resultMap);
        return resultMap;
    }

    // 해군 시작 위치 수동 지정
    @Override
    public int[] initMarineStart(int MarineNumber, int selectedNode) {
        board.getCurrentPosition()[MarineNumber] = selectedNode;
        return board.getCurrentPosition();
    }

    // 해군 시작 위치 랜덤 지정
    @Override
    public int[] initMarineStartRandom(int MarineNumber) {
        int[] marineStart = board.getMarineStartList();
        List<Integer> marineStartList = new ArrayList<>();
        for (int node : marineStart) {
            marineStartList.add(node);
        }
        Collections.shuffle(marineStartList);
        board.getCurrentPosition()[MarineNumber] = marineStartList.get(0);
        return board.getCurrentPosition();
    }

    // 해군 이동 가능 위치 조회
    @Override
    public int[] findMarineAvailableNode(int nodeNumber) {
        return new int[] {1, 2, 3};

        // 현재 자리에서 bfs를 돌면서

        // 0~2칸 이동 가능하다 (단, 하얀점을 칸수로 세지 않음)

        // 0~2칸 내의 모든 노드가 이동 가능한 노드 (단, 하얀칸은 칸수로 세지 않음)
    }
}
