package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.*;
import com.ssafy.sos.game.domain.record.GameRecordMember;
import com.ssafy.sos.game.domain.record.GameRecord;
import com.ssafy.sos.game.repository.GameMemberRepository;
import com.ssafy.sos.game.util.GameMode;
import com.ssafy.sos.game.util.GameRole;
import com.ssafy.sos.game.util.GameStatus;
import com.ssafy.sos.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final UserRepository userRepository;
    private final GameMemberRepository gameMemberRepository;
    private final GameTimerService gameTimerService;
    private final Board board;
    private final Random rand = new SecureRandom();
    private Game game;

    private boolean isMarineStanding(String gameId, int node) {
        game = board.getGameMap().get(gameId);
        int[] currentPosition = game.getCurrentPosition();
        return currentPosition[1] == node || currentPosition[2] == node || currentPosition[3] == node;
    }

    private String generateRandomCode() {
        char randomAlphabet = (char) ('A' + rand.nextInt(26));
        int randomNumber = rand.nextInt(1000);
        return String.format("%c%03d", randomAlphabet, randomNumber);
    }

    @Override
    public void gameStart(String gameId) {
        game = new Game(gameId);

        // 게임 상태 변경
        game.setGameStatus(GameStatus.BEFORE_START);

        board.getGameMap().put(gameId, game);
        // 보물상자 위치 랜덤 지정
        setPirateTreasure(gameId);

        // 사용자별 역할 지정
        List<Integer> random = Arrays.asList(0, 1, 2, 3);
        Collections.shuffle(random);

        Room room = board.getRoomMap().get(gameId);
        List<Player> roomPlayers = room.getInRoomPlayers();
        game.setGameMode(room.getGameMode());

        // 게임 모드에 맞게 역할 배정
        switch (room.getGameMode()) {
            case ONE_VS_ONE -> {
                if (random.get(0) == 0) {
                    game.getPlayers().put(0, roomPlayers.get(0));
                    for (int i = 1; i < 4; i++) {
                        game.getPlayers().put(i, roomPlayers.get(1));
                    }
                } else {
                    game.getPlayers().put(0, roomPlayers.get(1));
                    for (int i = 1; i < 4; i++) {
                        game.getPlayers().put(i, roomPlayers.get(0));
                    }
                }
            }
            case ONE_VS_THREE -> {
                for (int i = 0; i < 4; i++) {
                    game.getPlayers().put(random.get(i), roomPlayers.get(i));
                }
            }
        }
        // 시작 시간 세팅
        game.setStartTime(LocalDateTime.now());
    }

    // 보물섬 위치 랜덤 지정
    @Override
    public int[] setPirateTreasure(String gameId) {
        int[] treasures = new int[4];
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
        HashMap<Integer, Boolean> treasuresMap = game.getTreasures();
        for (int i=0; i<4; i++) {
            treasuresMap.put(treasures[i], false);
        }
        return treasures;
    }

    // 해적 시작위치 수동지정
    @Override
    public int initPirateStart(String gameId, int selectedNode) {
        game = board.getGameMap().get(gameId);
        game.getCurrentPosition()[0] = selectedNode;
        game.getPirateRoute().add(selectedNode);
        return selectedNode;
    }

    // 해적 시작위치 랜덤지정
    @Override
    public int initPirateRandomStart(String gameId) {
        game = board.getGameMap().get(gameId);
        Set<Integer> treasures = game.getTreasures().keySet();

        int randomIndex = rand.nextInt(treasures.size());
        int nextNode = treasures.stream().skip(randomIndex).findFirst().orElse(0);

        // getCurrentPosition 배열의 해적 위치[0]
        game.getCurrentPosition()[0] = nextNode;
        game.getPirateRoute().add(nextNode);
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
    public int[] initMarineStart(String gameId, int marineNumber, int selectedNode) {
        // 이미 다른 해군이 고른 번호라면
        game = board.getGameMap().get(gameId);
        if (selectedNode == game.getCurrentPosition()[1] || selectedNode == game.getCurrentPosition()[2] || selectedNode == game.getCurrentPosition()[3]) {
            System.out.println("이미 다른 해군에 의해 선택된 위치입니다. 다른 위치에서 시작해주세요.");
            return null;
        }
        game.getCurrentPosition()[marineNumber] = selectedNode;
        switch (marineNumber) {
            case 1 -> game.getMarineOneRoute().add(selectedNode);
            case 2 -> game.getMarineTwoRoute().add(selectedNode);
            case 3 -> game.getMarineThreeRoute().add(selectedNode);
        }
        return game.getCurrentPosition();
    }

    // 해군 시작 위치 랜덤 지정
    @Override
    public int[] initMarineStartRandom(String gameId, int marineNumber) {
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
            game.getCurrentPosition()[marineNumber] = node;
            switch (marineNumber) {
                case 1 -> game.getMarineOneRoute().add(node);
                case 2 -> game.getMarineTwoRoute().add(node);
                case 3 -> game.getMarineThreeRoute().add(node);
            }
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

        Deque<Integer> route = new LinkedList<>();
        route.add(nodeNumber);
        route.add(nodeNumber);

        resultMap.put(nodeNumber, route);

        return resultMap;
    }

    @Override
    public boolean move(String gameId, int nodeNumber, int role) {
        Game game = board.getGameMap().get(gameId);
        if (game == null) return false;

        int[] currentPosition = game.getCurrentPosition();

        // 현재 위치 변경 : nodeNumber와 role의 유효성 검사
        if ((role == 0 && nodeNumber >= 1 && nodeNumber <= 189) ||
                ((role >= 1 && role <= 3) && nodeNumber >= 200 && nodeNumber <= 373)) {
            currentPosition[role] = nodeNumber;
        } else {
            return false;
        }

        // 이동 경로에 추가
        switch (role) {
            case 0:
                game.getPirateRoute().add(nodeNumber);
                break;
            case 1:
                game.getMarineOneRoute().add(nodeNumber);
                break;
            case 2:
                game.getMarineTwoRoute().add(nodeNumber);
                break;
            case 3:
                game.getMarineThreeRoute().add(nodeNumber);
                break;
        }

        return true;
    }

    @Override
    public Room makeRoom(Player player, GameMode gameMode) {
        // 방 번호 랜덤으로 생성 후 중복 검사
        String gameId;
        int cnt = 0;
        do {
            gameId = generateRandomCode();
            cnt += 1;
            if (cnt == 26 * 1000) throw new RuntimeException();
        } while (
                board.getGameMap().containsKey(gameId)
        );

        board.getRoomMap().put(gameId, new Room(gameId));
        Room room = board.getRoomMap().get(gameId);
        room.setHost(player);
        room.getInRoomPlayers().add(player);
        room.setGameMode(gameMode);

        System.out.println("Room Number: " + gameId);
        return room;
    }

    @Override
    public Room enterRoom(String gameId, Player player) {
        Room room = board.getRoomMap().get(gameId);

        // 방이 다 차있지 않으면
        if (room.getInRoomPlayers().size() < room.getGameMode().playerLimit()) {
            room.getInRoomPlayers().add(player);
        }
        return room;
    }

    // 조사 가능한 노드 반환
    @Override
    public void findMarineInvestigableNode(String gameId, int role) {
        Game game = board.getGameMap().get(gameId);
        Investigate investigate = game.getInvestigate();
        HashMap<Integer, Boolean> nodes = investigate.getNodes();

        if (nodes == null) {
            // 인접한 노드 중 해적 노드만 가져오기
            int[] adjList;
            adjList = Arrays.stream(board.getGraph()[game.getCurrentPosition()[role]])
                    .filter(adjacentNode -> adjacentNode < 200)
                    .toArray();

            nodes = new HashMap<>();
            for (int j : adjList) {
                nodes.put(j, false);
            }

            investigate.setNodes(nodes);
        }
    }

    @Override
    public boolean investigate(String gameId, int nodeNumber, int role) {
        Game game = board.getGameMap().get(gameId);
        Investigate investigate = game.getInvestigate();
        HashMap<Integer, Boolean> nodes = investigate.getNodes();

        nodes.put(nodeNumber, true);

        // 조사 성공/실패
        // 해적이 지나간 경로에 조사하려는 노드 번호가 포함되었을 경우 true 반환
        if (game.getPirateRoute().contains(nodeNumber)) {
            investigate.setSuccess(true);
            game.getInvestigateSuccess().add(nodeNumber);
            return true;
        } else {
            investigate.setSuccess(false);
            return false;
        }
    }

    @Override
    public int[] findMarineArrestableNode(String gameId, int role) {
        game = board.getGameMap().get(gameId);
        // 인접한 노드 중 해적 노드만 가져오기
        int[] adjList;
        adjList = Arrays.stream(board.getGraph()[game.getCurrentPosition()[role]])
                .filter(adjacentNode -> adjacentNode < 200)
                .toArray();

        return adjList;
    }

    @Override
    public boolean arrest(String gameId, int nodeNumber) {
        Game game = board.getGameMap().get(gameId);
        return game.getCurrentPosition()[0] == nodeNumber;
    }

    @Override
    public void gameOver(String gameId, boolean gameResult) {
        Game game = board.getGameMap().get(gameId);
        game.setEndTime(LocalDateTime.now());

        // 혹시 타이머가 돌아가고 있다면 타이머 종료
        gameTimerService.cancelTimer(gameId);

        // mongodb에 gameRecord 저장
        for (int i = 0; i < game.getGameMode().playerLimit(); i++) {
            Player player = game.getPlayers().get(i);
            // 해당 플레이어가 회원이면 기록 저장
            if (player.getUserInfo() != null) {
                GameRecord gameRecord = GameRecord.builder()
                        .thieve(game.getPlayers().get(0).getNickname())
                        .navy(new String[]{
                                game.getPlayers().get(1).getNickname(),
                                game.getPlayers().get(2).getNickname(),
                                game.getPlayers().get(3).getNickname()})
                        .nodes(game.getPirateRoute())
                        .victory((gameResult && i == GameRole.PIRATE.getRoleNumber()) ||
                                (!gameResult && i != GameRole.PIRATE.getRoleNumber()))
                        .startTime(LocalDateTime.now())
                        .endTime(LocalDateTime.now())
                        .point(100)
                        .build();

                String username = game.getPlayers().get(i).getNickname();
                GameRecordMember gameRecordMember = gameMemberRepository.findByUsername(username)
                        .orElseGet(() -> {
                            GameRecordMember newMember = GameRecordMember.builder()
                                    .username(username)
                                    .gameRecords(new ArrayList<>())
                                    .build();
                            gameMemberRepository.save(newMember);
                            return newMember;
                        });

                // gold는 승리한 플레이어만 증가
                if((gameResult && i == GameRole.PIRATE.getRoleNumber()) ||
                        (!gameResult && i != GameRole.PIRATE.getRoleNumber())) {
                    userRepository.addGoldByUsername(username);
                }

                gameRecordMember.getGameRecords().add(gameRecord);
                gameMemberRepository.save(gameRecordMember);
            }
        }
        game.setGameStatus(GameStatus.GAME_FINISHED);
        board.getGameMap().remove(gameId);
    }

}
