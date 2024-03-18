package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Board;
import com.ssafy.sos.game.domain.Game;
import com.ssafy.sos.game.domain.Investigate;
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
    public HashMap<Integer, Deque<Integer>> findPirateAvailableNode(String gameId, int nodeNumber) {
        // BFS 으로 이동가능 모든 노드 탐색 및 직전 경로 저장
        game = board.getGameMap().get(gameId);
        int[][] graph = board.getGraph();
        Queue<Integer> queue = new LinkedList<>();
        boolean[] visited = new boolean[374];
        int[] previousNode = new int[374];
        ArrayList<Integer> result = new ArrayList<>();

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
                    previousNode[next] = now;
                    visited[next] = true;
                }
            }
        }

        // result(ArrayList)를 배열로 바꾸기
        int[] availableNode = result.stream()
                .mapToInt(i -> i)
                .toArray();

        // 직전 경로 배열 타고 이동하며 경로 추출
        HashMap<Integer, Deque<Integer>> resultMap = new HashMap<>();
        for (int node : availableNode) {
            Deque<Integer> route = new LinkedList<>();
            route.add(node);
            int currentNode = node;
            while (previousNode[currentNode] != 0) {
                route.addFirst(previousNode[currentNode]);
                currentNode = previousNode[currentNode];
            }
            resultMap.put(node, route);
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
    public HashMap<Integer, Deque<Integer>> findMarineAvailableNode(String gameId, int nodeNumber) {
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

        HashMap<Integer, Deque<Integer>> resultMap = new HashMap<>();
        for (int node : availableNode) {
            Deque<Integer> route = new LinkedList<>();
            route.add(node);
            int currentNode = node;
            while (previousNode[currentNode] != 0) {
                route.addFirst(previousNode[currentNode]);
                currentNode = previousNode[currentNode];
            }
            resultMap.put(node, route);
        }
        return resultMap;
    }

    @Override
    public boolean move(String gameId, int nodeNumber, int role) {
        Game game = board.getGameMap().get(gameId);
        if (game == null) return false;

        int[] currentPosition = game.getCurrentPosition();

        // 현재 위치 변경 : nodeNumber와 role의 유효성 검사
        if ((role == 0 && nodeNumber >= 1 && nodeNumber <= 188) ||
                ((role >= 1 && role <= 3) && nodeNumber >= 200 && nodeNumber <= 373)) {
            currentPosition[role] = nodeNumber;
        } else {
            return false;
        }

        // 이동 경로에 추가
        switch (role) {
            case 0:
                game.getPirateRoute().add(nodeNumber);
            case 1:
                game.getMarineOneRoute().add(nodeNumber);
            case 2:
                game.getMarineTwoRoute().add(nodeNumber);
            case 3:
                game.getMarineThreeRoute().add(nodeNumber);
        }

        return true;
    }

    @Override
    public boolean investigate(String gameId, int nodeNumber, int role) {
        Game game = board.getGameMap().get(gameId);
        Investigate investigate = game.getInvestigate();

        HashMap<Integer, Boolean> nodes = investigate.getNodes();
        if (nodes == null) {
            // 인접한 노드 중 해적 노드만 가져오기
            int[] adjList = null;
            if (role == 1 || role == 2 || role == 3) {
                adjList = Arrays.stream(board.getGraph()[game.getCurrentPosition()[role]])
                        .filter(adjacentNode -> adjacentNode < 200)
                        .toArray();
            } else {
                throw new RuntimeException();
            }

            nodes = new HashMap<>();
            for (int j : adjList) {
                nodes.put(j, false);
            }
        }

        nodes.put(nodeNumber, true);

        // 조사 성공/실패
        // 해적이 지나간 경로에 조사하려는 노드 번호가 포함되었을 경우 true 반환
        if (game.getPirateRoute().contains(nodeNumber)) {
            investigate.setSuccess(true);
            return true;
        } else {
            investigate.setSuccess(false);
            return false;
        }
    }

    @Override
    public boolean arrest(String gameId, int nodeNumber) {
        Game game = board.getGameMap().get(gameId);
        return game.getCurrentPosition()[0] == nodeNumber;
    }
}
