package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Board;
import com.ssafy.sos.game.domain.Game;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final Board board;
    private Game game;

    private boolean isMarineStanding(String gameId, int node) {
        game = board.getGameMap().get(gameId);
        int[] currentPosition = game.getCurrentPosition();
        return currentPosition[1] == node || currentPosition[2] == node || currentPosition[3] == node;
    }

    // 보물섬 위치 랜덤 지정
    @Override
    public int[] setPirateTreasure(String gameId) {
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

        game = board.getGameMap().get(gameId);
        game.setTreasures(treasures);
        return treasures;
    }

    // 해적 시작위치 수동지정
    @Override
    public int initPirateStart(String gameId, int selectedNode) {
        game = board.getGameMap().get(gameId);
        game.getCurrentPosition()[0] = selectedNode;
        return selectedNode;
    }

    // 해적 시작위치 랜덤지정
    @Override
    public int initPirateRandomStart(String gameId) {
        game = board.getGameMap().get(gameId);
        int[] treasures = game.getTreasures();
        Random rand = new Random();
        int nextNode = treasures[rand.nextInt(4)];
        // getCurrentPosition 배열의 해적 위치[0]
        game.getCurrentPosition()[0] = nextNode;
        return nextNode;
    }

    // 해적 이동 가능 위치 조회
    @Override
    public HashMap<Integer, Stack<Integer>> findPirateAvailableNode(String gameId, int nodeNumber) {
        // BFS 으로 이동가능 모든 노드 탐색
        game = board.getGameMap().get(gameId);
        int[][] graph = board.getGraph();
        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[374];
        ArrayList<Integer> result = new ArrayList<>();
        int[] currentPosition = game.getCurrentPosition();

        queue.add(nodeNumber);
        visited[nodeNumber] = true;

        while (!queue.isEmpty()) {
            int now = queue.poll();
            for (int next : graph[now]) {
                // 방문하지 않은 노드라면
                if (!visited[next]) {
                    // 이 자리에 해군이 서있다면 (이동 불가)
                    if (isMarineStanding(gameId, next)) {
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

        // 각각의 이동가능한 노드를 DFS 돌며 경로추적 및 저장
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
        return resultMap;
    }

    // 해군 시작 위치 수동 지정
    @Override
    public int[] initMarineStart(String gameId, int MarineNumber, int selectedNode) {
        // 이미 다른 해군이 고른 번호라면
        game = board.getGameMap().get(gameId);
        if (selectedNode == game.getCurrentPosition()[1] || selectedNode == game.getCurrentPosition()[2] || selectedNode == game.getCurrentPosition()[3]) {
            System.out.println("이미 다른 해군에 의해 선택된 위치입니다. 다른 위치에서 시작해주세요.");
            return null;
        }
        game.getCurrentPosition()[MarineNumber] = selectedNode;
        return game.getCurrentPosition();
    }

    // 해군 시작 위치 랜덤 지정
    @Override
    public int[] initMarineStartRandom(String gameId, int MarineNumber) {
        int[] marineStart = board.getMarineStartList();
        List<Integer> marineStartList = new ArrayList<>();
        for (int node : marineStart) {
            marineStartList.add(node);
        }
        Collections.shuffle(marineStartList);
        game = board.getGameMap().get(gameId);
        // 다른 해군에 의해 선택되지 않은 번호 선택
        for (Integer node : marineStartList) {
            if ((node == game.getCurrentPosition()[1] || node == game.getCurrentPosition()[2] || node == game.getCurrentPosition()[3])) {
                continue;
            }
            game.getCurrentPosition()[MarineNumber] = node;
            break;
        }
        return game.getCurrentPosition();
    }

    // 해군 이동 가능 위치 조회
    @Override
    public HashMap<Integer, List<Integer>> findMarineAvailableNode(String gameId, int nodeNumber) {
        // 0-1 BFS 으로 이동가능 모든 노드 경로 추적하며 탐색
        int[][] graph = board.getGraph();
        game = board.getGameMap().get(gameId);
        ArrayList<Integer> result = new ArrayList<>();
        Deque<Integer> deque = new LinkedList<>();
        deque.add(nodeNumber);
        int[] distance = new int[374];
        int[] previousNode = new int[374];
        Arrays.fill(distance, Integer.MAX_VALUE);
        distance[nodeNumber] = 0;

        while(!deque.isEmpty()) {
            int now = deque.removeFirst();
            for (int next : graph[now]) {
                // 방문하지 않은 노드라면 0~2칸 이동 가능
                if (distance[next] == Integer.MAX_VALUE) {
                    // 해적 노드라면 (하얀 점이라면)
                    if (next <= 199) {
                        if (distance[now] < distance[next]) {
                            deque.addFirst(next);
                            // 하얀점은 칸수로 세지 않음)
                            distance[next] = distance[now];
                            previousNode[next] = now;
                        }
                    }
                    // 해군 노드라면 (검은 점이라면)
                    else {
                        if (distance[now] + 1 < distance[next]) {
                            // 거리 +1
                            distance[next] = distance[now] + 1;
                            previousNode[next] = now;
                            // 거리가 2 이내라면
                            if (distance[next] <= 2) {
                                deque.addLast(next);
                                // 다른 해군이 서있지 않을때만 해당 정점으로 이동할 수 있음
                                if (!(isMarineStanding(gameId, next))) {
                                    result.add(next);
                                }
                            }
                        }
                    }
                }
            }
        }

        // result(ArrayList)를 배열로 바꾸기
        int[] availableNode = result.stream()
                .mapToInt(i -> i)
                .toArray();

        HashMap<Integer, List<Integer>> resultMap = new HashMap<>();
        for (int node : availableNode) {
            List<Integer> rout = new ArrayList<>();
            rout.add(node);
            int currentNode = node;
            while (previousNode[currentNode] != 0) {
                rout.addFirst(previousNode[currentNode]);
                currentNode = previousNode[currentNode];
            }
            resultMap.put(node, rout);
        }
        return resultMap;
    }
}
