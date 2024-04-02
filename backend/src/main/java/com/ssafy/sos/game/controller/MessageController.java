package com.ssafy.sos.game.controller;

import com.ssafy.sos.game.domain.*;
import com.ssafy.sos.game.event.MatchingEvent;
import com.ssafy.sos.game.message.client.ClientMessage;
import com.ssafy.sos.game.message.client.ClientInitMessage;
import com.ssafy.sos.game.message.client.ClientMoveMessage;
import com.ssafy.sos.game.message.server.ServerArrestMessage;
import com.ssafy.sos.game.message.server.ServerMessage;
import com.ssafy.sos.game.message.server.ServerMoveMessage;
import com.ssafy.sos.game.service.GameService;
import com.ssafy.sos.game.service.GameTimerService;
import com.ssafy.sos.game.service.MatchingService;
import com.ssafy.sos.game.event.TimerTimeoutEvent;
import com.ssafy.sos.game.util.GameRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import java.util.*;

import static com.ssafy.sos.game.util.GameStatus.IN_GAME;

@Controller
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
@CrossOrigin("*")
public class MessageController {
    private final SimpMessageSendingOperations sendingOperations;
    private final Board board;
    private final GameService gameService;
    private final GameTimerService gameTimerService;
    private final MatchingService matchingService;

    // 응답이 왔는지 여부를 판단할 flag
    private boolean lockRespond;

    // 게임 시작했는지 판단
    public boolean isStarted = false;

    // 소켓 연결시 실행
    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        String sessionId = Objects.requireNonNull(
                event.getMessage().getHeaders().get("simpSessionId"),
                "message: session ID is null")
                .toString();

        board.getSessionMap().put(sessionId, new ArrayList<>());
    }

    // 소켓 연결 해제시 실행
    @EventListener
    public void handleDisconnectEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        List<String> sessionMemberGame= board.getSessionMap().getOrDefault(sessionId, null);

        if (sessionMemberGame == null) return;

        // connect 후 방 입장 되기 전에 disconnect 됐을 경우
        if (!sessionMemberGame.isEmpty()) {
            String nickname = sessionMemberGame.get(0);
            String gameId = sessionMemberGame.get(1);
            Room room = board.getRoomMap().getOrDefault(gameId, null);

            if (room != null) {
                // 대기실에서 소켓 끊기면 방 퇴장
                room.getInRoomPlayers().removeIf(player -> player.getNickname().equals(nickname));
                ServerMessage serverMessage = ServerMessage.builder()
                        .message("PLAYER_LEAVED")
                        .gameId(gameId)
                        .room(room)
                        .build();
                sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
            }
            isStarted = false;
            Game game = board.getGameMap().getOrDefault(gameId, null);

            if (game == null) return;

            // 게임 중에 나가진 경우
            if (game.getGameStatus() == IN_GAME) {
                // 나간 사람이 해적이라면
                if (game.getPlayers().get(0).getNickname().equals(nickname)) {
                    // 해적이 기권패 했음을 모두에게 알림
                    sendMessageWithGame(gameId, game,"GAME_OVER_PIRATE_LEAVED_MARINE_WIN");
                    // 해군 승리
                    gameService.gameOver(gameId, false);
                }
                // 해군이라면
                else {
                    // 해군이 기권패 했음을 모두에게 알림
                    sendMessageWithGame(gameId, game,"GAME_OVER_MARINE_LEAVED_PIRATE_WIN");
                    // 해적 승리
                    gameService.gameOver(gameId, true);
                }
            }
        }
    }

    @MessageMapping("/matching")
    public void matching(ClientMessage message) {
        String sender = message.getSender();
        String gameId = message.getGameId();
        Room room = board.getRoomMap().get(gameId);
        ServerMessage serverMessage;

        if (message.getMessage().equals("MATCHING_ACCEPTED")) {
            room.increaseIsAccepted();

            if (room.getIsAccepted() == 2) {
                serverMessage = ServerMessage.builder()
                        .gameId(gameId)
                        .room(room)
                        .message("ALL_ACCEPTED")
                        .build();

                sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
            }
        }

        if (message.getMessage().equals("MATCHING_REJECTED")) {
            // 거절 발생 시 나머지 플레이어는 자동으로 큐에 넣어 주고
            // 만들어진 방은 폭파
            Player acceptPlayer;
            for (int i=0; i<room.getGameMode().playerLimit(); i++) {
                Player player = room.getInRoomPlayers().get(i);
                if (!player.getNickname().equals(sender)) {
                    acceptPlayer = player;

                    matchingService.enqueue(acceptPlayer);
                    serverMessage = ServerMessage.builder()
                            .gameId(gameId)
                            .message("NEED_RE_MATCHING")
                            .build();

                    sendingOperations.convertAndSend("/sub/" + acceptPlayer.getNickname(), serverMessage);
                    break;
                }
            }

            board.getRoomMap().remove(gameId);
        }
    }

    @MessageMapping("/room")
    public synchronized void manageRoom(ClientMessage message, StompHeaderAccessor accessor) {
        String sender = message.getSender();
        String sessionId = accessor.getSessionId();

        ServerMessage serverMessage = null;
        String gameId = message.getGameId();
        Room room = board.getRoomMap().get(gameId);
        List<String> sessionInfo = board.getSessionMap().get(sessionId);
        System.out.println("여기까지 왔지롱");
        // 존재하지 않는 방이라면
        if (room == null) return;

        // 방 입장 (클 -> 서)
        if (message.getMessage().equals("ENTER_ROOM")) {
            for (Player player : room.getInRoomPlayers()) {
                if (player.getNickname().equals(sender)) {
                    sessionInfo.add(sender);
                    sessionInfo.add(gameId);

                    serverMessage = ServerMessage.builder()
                            .message("ENTER_SUCCESS")
                            .gameId(gameId)
                            .room(board.getRoomMap().get(gameId))
                            .build();
                    break;
                }
            }

            // 서버 메시지 출력
            if (serverMessage == null) {
                serverMessage = ServerMessage.builder()
                        .message("ENTER_FAILURE")
                        .gameId(gameId)
                        .build();
            }

            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);

            // 정원이 다 찼을 경우 시작버튼 활성화 broadcast
            if (room.getInRoomPlayers().size() == room.getGameMode().playerLimit()) {
                serverMessage = ServerMessage.builder()
                        .message("PREPARE_GAME_START")
                        .build();
                sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
            }
        }

        // 게임 시작 버튼 클릭시 (클 -> 서)
        if (message.getMessage().equals("START_BUTTON_CLICKED")) {
            if (!room.getHost().getNickname().equals(sender)) {
                serverMessage = ServerMessage.builder()
                        .message("ONLY_HOST_CAN_START")
                        .build();
                sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
                return;
            }

            // 게임 시작 버튼 클릭되었음을 모두에게 알림 (서 -> 클)
            serverMessage = ServerMessage.builder()
                    .message("START_BUTTON_CLICKED")
                    .build();
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        }

        // 렌더 완료시 상태 전송 (클 -> 서)
        if (message.getMessage().equals("RENDERED_COMPLETE")) {
            room.increaseIsRendered();

            // 처음으로 렌더를 완료한 사용자가 등장한다면
            if (room.getIsRendered() == 1) {
                gameService.gameStart(gameId);
            }
            // 게임 정보 전송 (서 -> 클)
            Game game = board.getGameMap().get(gameId);
            serverMessage = ServerMessage.builder()
                    .message("RENDER_COMPLETE_ACCEPTED")
                    .sender(sender)
                    .gameId(gameId)
                    .room(room)
                    .game(game)
                    .build();
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);

            // 방에 있는 모두의 렌더가 완료되면 알림 (서 -> 클)
            if (room.getIsRendered() == room.getGameMode().playerLimit()) {
                serverMessage = ServerMessage.builder()
                        .message("ALL_RENDERED_COMPLETED")
                        .game(game)
                        .room(room)
                        .build();
                sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
            }
        }

        // 사용자가 방에서 나간다면 (클 -> 서)
        if (message.getMessage().equals("LEAVE_ROOM")) {
            board.getSessionMap().get(sessionId).clear();
            // 방에 혼자 남아있었으면 방 폭파
            if (room.getInRoomPlayers().size() == 1) {
                board.getRoomMap().remove(gameId);
            } else {
                // 다음 들어온 사람에게 방장 넘김
                if (room.getHost().getNickname().equals(sender)) {
                    room.setHost(room.getInRoomPlayers().get(1));
                }
                room.getInRoomPlayers().removeIf(player -> player.getNickname().equals(sender));
            }

            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .room(room)
                    .message("PLAYER_LEAVED")
                    .build();
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        }
    }

    // 게임과 함께 메시지를 보내는 메서드
    private void sendMessageWithGame(String gameId, Game game, String message) {
        ServerMessage serverMessage;
        serverMessage = ServerMessage.builder()
                .gameId(gameId)
                .message(message)
                .game(game)
                .build();
        sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
    }

    // 이동시 필요한 정보(이동가능한 노드 조회)와 함께 메시지를 보내는 메서드
    private void sendMessageWithAvailableNode(String gameId, Game game, String message, HashMap<Integer, Deque<Integer>> availableNode) {
        ServerMoveMessage serverMoveMessage;
        serverMoveMessage = ServerMoveMessage.builder()
                .gameId(gameId)
                .message(message)
                .availableNode(availableNode)
                .game(game)
                .build();
        sendingOperations.convertAndSend("/sub/" + gameId, serverMoveMessage);
    }

    // 체포시 필요한 정보(체포가능한 노드 조회)와 함께 메시지를 보내는 메서드
    private void sendMessageWithArrestableNode(String gameId, Game game, String message, int[] arrestableNode) {
        ServerArrestMessage serverArrestMessage;
        serverArrestMessage = ServerArrestMessage.builder()
                .gameId(gameId)
                .message(message)
                .arrestableNode(arrestableNode)
                .game(game)
                .build();
        sendingOperations.convertAndSend("/sub/" + gameId, serverArrestMessage);
    }

    private void sendMessageWithArrestTriedNode(String gameId, Game game, String message, int triedNode) {
        ServerArrestMessage serverArrestMessage;
        serverArrestMessage = ServerArrestMessage.builder()
                .gameId(gameId)
                .message(message)
                .arrestTriedNode(triedNode)
                .game(game)
                .build();
        sendingOperations.convertAndSend("/sub/" + gameId, serverArrestMessage);
    }

    // 시작 위치 지정 제한 시간 초과
    private void initResponseTimeOut(String gameId, Game game, GameRole role) {
        // 응답 잠그기
        lockRespond = true;
        // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
        sendMessageWithGame(gameId, game, "INIT_"+role+"_START_TIME_OUT");
        // 시작위치 랜덤 지정
        if (role == GameRole.PIRATE) {
            gameService.initPirateRandomStart(gameId);
        }
        else {
            gameService.initMarineStartRandom(gameId, role.getRoleNumber());
        }
        // 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
        if (role == GameRole.MARINE_THREE) {
            // 해적 시작위치 보물상자 열어주기
            game.getTreasures().put(game.getCurrentPosition()[0], true);
        }
        sendMessageWithGame(gameId, game, "ACTION_INIT_"+role+"_START");
        // 2초 타이머 시작
        if (role == GameRole.MARINE_THREE) {
            // 해군 3 시작위치 지정 후 8초 기다려야 함
            gameTimerService.afterInitTimer(gameId, "READY_MOVE_"+role.getNextRole());
        } else {
            gameTimerService.startRenderWaitingTimer(gameId, "READY_INIT_"+role.getNextRole()+"_START");
        }
    }

    // 시작위치 렌더 타이머 종료
    private void initRenderTimeOut(String gameId, Game game, GameRole role) {
        // 시작위치 지정 (서 -> 클)
        sendMessageWithGame(gameId, game, "ORDER_INIT_"+role+"_START");
        // 응답 허용
        lockRespond = false;
        // 15초 타이머 시작
        gameTimerService.startResponseWaitingTimer(gameId, "INIT_"+role+"_START_TIME_OUT");
    }

    // 이동 응답 제한시간 초과
    private void moveResponseTimeOut(String gameId, Game game, GameRole role) {
        // 응답 잠그기
        lockRespond = true;
        // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
        sendMessageWithGame(gameId, game, "MOVE_"+role+"_TIME_OUT");
        HashMap<Integer, Deque<Integer>> findAvailableNode;
        // 랜덤 위치 이동
        if (role == GameRole.PIRATE) {
            findAvailableNode = gameService.findPirateAvailableNode(gameId, game.getCurrentPosition()[0]);
        } else {
            findAvailableNode = gameService.findMarineAvailableNode(gameId, game.getCurrentPosition()[role.getRoleNumber()]);
        }
        List<Integer> availableNodes = new ArrayList<>(findAvailableNode.keySet());
        Collections.shuffle(availableNodes);
        Integer nextNode = availableNodes.get(0);
        // 입력받은 노드 저장
        gameService.move(gameId, nextNode, role.getRoleNumber());
        // 이동 완료 브로드캐스트
        sendMessageWithAvailableNode(gameId, game,"ACTION_MOVE_"+role, findAvailableNode);
        // 2초 타이머 시작
        if (role == GameRole.PIRATE) {
            gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_"+role.getNextRole());
        } else {
            gameTimerService.startRenderWaitingTimer(gameId, "READY_SELECT_WORK_"+role);
        }
    }

    // 이동 렌더 타이머 종료
    private void moveRenderTimeOut(String gameId, Game game, GameRole role) {
        HashMap<Integer, Deque<Integer>> availableNode;
        if (role == GameRole.PIRATE) {
            // 해적 이동가능 위치 계산
            availableNode = gameService.findPirateAvailableNode(gameId, game.getCurrentPosition()[role.getRoleNumber()]);
            // 해적이 포위되어서 더 이상 갈 곳이 없다면, 해적 패배 해군 승리
            if (availableNode.isEmpty()) {
                sendMessageWithGame(gameId, game, "GAME_OVER_PIRATE_SURROUNDED_MARINE_WIN");
                gameService.gameOver(gameId, false);
                return;
            }
        } else {
            // 해군 이동가능 위치 계산
            availableNode = gameService.findMarineAvailableNode(gameId, game.getCurrentPosition()[role.getRoleNumber()]);
        }
        // 이동 명령 (서 -> 클)
        sendMessageWithAvailableNode(gameId, game, "ORDER_MOVE_"+role, availableNode);
        // 응답 허용
        lockRespond = false;
        // 15초 타이머 시작
        gameTimerService.startResponseWaitingTimer(gameId, "MOVE_"+role+"_TIME_OUT");
    }

    // 해군 조사 로직
    private void marineInvestigate(String gameId, Game game, GameRole role, int node) {
        // 입력받은 노드 조사
        boolean investigateResult = gameService.investigate(gameId, node, role.getRoleNumber());
        // 조사 성공
        if (investigateResult) {
            // 해군 조사 성공 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INVESTIGATE_"+role+"_SUCCESS");
            // investigate 초기화
            game.getInvestigate().setNodes(null);
            game.getInvestigate().setSuccess(false);
            // 2초 타이머 시작
            if (role == GameRole.MARINE_THREE) {
                gameTimerService.startRenderWaitingTimer(gameId, "READY_TURN_OVER");
            }
            else {
                gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_"+role.getNextRole());
            }
        }
        // 조사 실패
        else {
            // 아직 더 조사할 노드가 남았으면
            if (game.getInvestigate().getNodes().containsValue(false)) {
                // 해군 조사 실패 브로드캐스트 (서 -> 클)
                sendMessageWithGame(gameId, game, "ACTION_INVESTIGATE_"+role+"_FAIL");
                // 0.1초 타이머 시작
                gameTimerService.afterSelectTimer(gameId, "READY_INVESTIGATE_"+role);
            }
            // 더 이상 조사할 노드가 없으면
            else {
                // 해군 조사 실패 브로드캐스트 (서 -> 클)
                sendMessageWithGame(gameId, game, "ACTION_INVESTIGATE_"+role+"_ALL_FAILED");
                // investigate 초기화
                game.getInvestigate().setNodes(null);
                game.getInvestigate().setSuccess(false);

                // 2초 타이머 시작
                if (role == GameRole.MARINE_THREE) {
                    gameTimerService.startRenderWaitingTimer(gameId, "READY_TURN_OVER");
                }
                else {
                    gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_"+role.getNextRole());
                }
            }
        }
    }

    // 이동 -> 행동선택 2초 타이머 경과 후
    private void moveToSelectRenderTimeOut(String gameId, Game game, GameRole role) {
        // 해군 조사 또는 체포 선택 (서 -> 클)
        sendMessageWithGame(gameId, game, "ORDER_SELECT_WORK_"+role);
        // 응답 허용
        lockRespond = false;
        // 15초 타이머 시작
        gameTimerService.startResponseWaitingTimer(gameId, "SELECT_WORK_"+role+"_TIME_OUT");
    }

    // 행동선택 응답 제한시간 초과
    private void selectResponseTimeOut(String gameId, Game game, GameRole role) {
        // 응답 잠그기
        lockRespond = true;
        // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
        sendMessageWithGame(gameId, game, "SELECT_WORK_"+role+"_TIME_OUT");
        // 응답이 없을 경우 행동은 항상 조사, 해군 행동 선택완료 브로드캐스트 (서 -> 클)
        sendMessageWithGame(gameId, game,"ACTION_SELECT_WORK_"+role+"_INVESTIGATE");
        // 0.1초 타이머 시작
        gameTimerService.afterSelectTimer(gameId, "READY_INVESTIGATE_"+role);
    }

    // 행동선택 -> 조사 0.1초 타이머 경과 후
    private void investigateRenderTimeOut(String gameId, Game game, GameRole role) {
        // 조사 가능한 노드 조회
        gameService.findMarineInvestigableNode(gameId, role.getRoleNumber());
        // 해군 조사 명령 (서 -> 클)
        sendMessageWithGame(gameId, game, "ORDER_INVESTIGATE_"+role);
        // 응답 허용
        lockRespond = false;
        // 15초 타이머 시작
        gameTimerService.startResponseWaitingTimer(gameId, "INVESTIGATE_"+role+"_TIME_OUT");
    }

    // 조사 응답 제한 시간 초과
    private Integer investigateResponseTimeOut(String gameId, Game game, GameRole role) {
        // 응답 잠그기
        lockRespond = true;
        // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
        sendMessageWithGame(gameId, game, "INVESTIGATE_"+role+"_TIME_OUT");
        // 선택 가능한 노드 들 중 하나 랜덤 선택
        Integer nextNode = null;
        for (Integer node : game.getInvestigate().getNodes().keySet()) {
            if (!game.getInvestigate().getNodes().get(node)) {
                nextNode = node;
                break;
            }
        }
        // 더 이상 조사할 노드가 없으면
        if (nextNode == null) {
            // 해군 조사 실패 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INVESTIGATE_"+role+"_ALL_FAILED");
            // investigate 초기화
            game.getInvestigate().setNodes(null);
            game.getInvestigate().setSuccess(false);
            // 2초 타이머 시작
            if (role == GameRole.MARINE_THREE) {
                gameTimerService.startRenderWaitingTimer(gameId, "READY_TURN_OVER");
            } else {
                gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_" + role.getNextRole());
            }
        }
        return nextNode;
    }

    // 행동선택 -> 체포 2초 타이머 경과 후
    private void arrestRenderTimeOut(String gameId, Game game, GameRole role) {
        // 조사 가능한 노드 조회
        int[] arrestableNode = gameService.findMarineArrestableNode(gameId, role.getRoleNumber());
        // 해군 체포 명령 (서 -> 클)
        sendMessageWithArrestableNode(gameId, game, "ORDER_ARREST_"+role, arrestableNode);
        // 응답 허용
        lockRespond = false;
        // 15초 타이머 시작
        gameTimerService.startResponseWaitingTimer(gameId, "ARREST_"+role+"_TIME_OUT");
    }

    // 체포 응답 제한 시간 초과
    private void arrestResponseTimeOut(String gameId, Game game, GameRole role) {
        // 응답 잠그기
        lockRespond = true;
        // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
        sendMessageWithGame(gameId, game, "ARREST_"+role+"_TIME_OUT");
        // 랜덤 위치 지정하여 체포 조사하기 (서 -> 클)
        int[] arrestableNode = gameService.findMarineArrestableNode(gameId, role.getRoleNumber());
        // 체포 성공여부 확인
        boolean isArrestSuccess = gameService.arrest(gameId, arrestableNode[0]);
        // 체포 성공 시 게임 종료
        if (isArrestSuccess) {
            // 게임종료 (해군 승리) 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game,"GAME_OVER_"+role+"_ARREST_SUCCESS");
            gameService.gameOver(gameId, false);
        }
        // 체포 실패 시 게임 진행
        else {
            // 해군 체포 실패 브로드캐스트 (서 -> 클)
            sendMessageWithArrestTriedNode(gameId, game, "ACTION_ARREST_"+role+"_FAIL", arrestableNode[0]);
            // 2초 타이머 시작
            if (role == GameRole.MARINE_THREE) {
                gameTimerService.startRenderWaitingTimer(gameId, "READY_TURN_OVER");
            } else {
                gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_"+role.getNextRole());
            }
        }
    }

    // 타이머가 끝남을 감지
    @EventListener
    public void listenTimeout(TimerTimeoutEvent event) {
        String gameId = event.getGameId();
        String message = event.getMessage();
        Game game = board.getGameMap().get(gameId);

        // 해적 시작위치 지정 응답 제한시간 초과
        if (message.equals("INIT_PIRATE_START_TIME_OUT")) {
            initResponseTimeOut(gameId, game, GameRole.PIRATE);
        }

        // 2초 타이머 경과 (해적 시작위치 지정 -> 해군1 시작위치 지정)
        if (message.equals("READY_INIT_MARINE_ONE_START")) {
            initRenderTimeOut(gameId, game, GameRole.MARINE_ONE);
        }

        // 해군 1 시작위치 지정 응답 제한시간 초과
        if (message.equals("INIT_MARINE_ONE_START_TIME_OUT")) {
            initResponseTimeOut(gameId, game, GameRole.MARINE_ONE);
        }

        // 2초 타이머 경과 (해군 1 시작위치 지정 -> 해군 2 시작위치 지정)
        if (message.equals("READY_INIT_MARINE_TWO_START")) {
            initRenderTimeOut(gameId, game, GameRole.MARINE_TWO);
        }

        // 해군 2 시작위치 지정 응답 제한시간 초과
        if (message.equals("INIT_MARINE_TWO_START_TIME_OUT")) {
            initResponseTimeOut(gameId, game, GameRole.MARINE_TWO);
        }

        // 2초 타이머 경과 (해군 2 시작위치 지정 -> 해군 3 시작위치 지정)
        if (message.equals("READY_INIT_MARINE_THREE_START")) {
            initRenderTimeOut(gameId, game, GameRole.MARINE_THREE);
        }

        // 해군 3 시작위치 지정 응답 제한시간 초과
        if (message.equals("INIT_MARINE_THREE_START_TIME_OUT")) {
            initResponseTimeOut(gameId, game, GameRole.MARINE_THREE);
        }

        // 2초 타이머 경과 (해군 3 시작위치 지정 -> 해적 이동)
        if (message.equals("READY_MOVE_PIRATE")) {
            moveRenderTimeOut(gameId, game, GameRole.PIRATE);
        }

        // 해적 이동 응답 제한시간 초과
        if (message.equals("MOVE_PIRATE_TIME_OUT")) {
            moveResponseTimeOut(gameId, game, GameRole.PIRATE);
        }

        // 2초 타이머 경과 (해적 이동 -> 해군 1 이동)
        if (message.equals("READY_MOVE_MARINE_ONE")) {
            moveRenderTimeOut(gameId, game, GameRole.MARINE_ONE);
        }

        // 해군 1 이동 응답 제한시간 초과
        if (message.equals("MOVE_MARINE_ONE_TIME_OUT")) {
            moveResponseTimeOut(gameId, game, GameRole.MARINE_ONE);
        }

        // 2초 타이머 경과 (해군 1 이동 -> 해군 1 조사 or 체포 선택)
        if (message.equals("READY_SELECT_WORK_MARINE_ONE")) {
            moveToSelectRenderTimeOut(gameId, game, GameRole.MARINE_ONE);
        }

        // 해군 1 행동 선택 응답 제한시간 초과
        if (message.equals("SELECT_WORK_MARINE_ONE_TIME_OUT")) {
            selectResponseTimeOut(gameId, game, GameRole.MARINE_ONE);
        }

        // 조사 선택시
        // 0.1초 타이머 경과 (해군 1 행동 선택 -> 해군 1 조사)
        if (message.equals("READY_INVESTIGATE_MARINE_ONE")) {
            investigateRenderTimeOut(gameId, game, GameRole.MARINE_ONE);
        }

        // 해군 1 조사 응답 제한시간 초과
        if (message.equals("INVESTIGATE_MARINE_ONE_TIME_OUT")) {
            Integer nextNode = investigateResponseTimeOut(gameId, game, GameRole.MARINE_ONE);
            // 조사할 노드가 남아 있으면
            if (nextNode != null) {
                // 조사 진행
                marineInvestigate(gameId, game, GameRole.MARINE_ONE, nextNode);
            }
        }

        // 0.1초 타이머 경과 (해군 1 행동 선택 -> 해군 1 체포)
        if (message.equals("READY_ARREST_MARINE_ONE")) {
            arrestRenderTimeOut(gameId, game, GameRole.MARINE_ONE);
        }

        // 해군 1 체포 응답 제한시간 초과
        if (message.equals("ARREST_MARINE_ONE_TIME_OUT")) {
            arrestResponseTimeOut(gameId, game, GameRole.MARINE_ONE);
        }

        // 2초 타이머 경과 (해군 1 조사 또는 체포 -> 해군 2 이동)
        if (message.equals("READY_MOVE_MARINE_TWO")) {
            moveRenderTimeOut(gameId, game, GameRole.MARINE_TWO);
        }

        // 해군 2 이동 응답 제한시간 초과
        if (message.equals("MOVE_MARINE_TWO_TIME_OUT")) {
            moveResponseTimeOut(gameId, game, GameRole.MARINE_TWO);
        }

        // 2초 타이머 경과 (해군 2 이동 -> 해군 2 조사 or 체포 선택)
        if (message.equals("READY_SELECT_WORK_MARINE_TWO")) {
            moveToSelectRenderTimeOut(gameId, game, GameRole.MARINE_TWO);
        }

        // 해군 2 행동 선택 응답 제한시간 초과
        if (message.equals("SELECT_WORK_MARINE_TWO_TIME_OUT")) {
            selectResponseTimeOut(gameId, game, GameRole.MARINE_TWO);
        }

        // 조사 선택시
        // 0.1초 타이머 경과 (해군 2 행동 선택 -> 해군 2 조사)
        if (message.equals("READY_INVESTIGATE_MARINE_TWO")) {
            investigateRenderTimeOut(gameId, game, GameRole.MARINE_TWO);
        }

        // 해군 2 조사 응답 제한시간 초과
        if (message.equals("INVESTIGATE_MARINE_TWO_TIME_OUT")) {
            Integer nextNode = investigateResponseTimeOut(gameId, game, GameRole.MARINE_TWO);
            // 조사할 노드가 남아 있으면
            if (nextNode != null) {
                // 조사 진행
                marineInvestigate(gameId, game, GameRole.MARINE_TWO, nextNode);
            }
        }

        // 0.1초 타이머 경과 (해군 2 행동 선택 -> 해군 2 체포)
        if (message.equals("READY_ARREST_MARINE_TWO")) {
            arrestRenderTimeOut(gameId, game, GameRole.MARINE_TWO);
        }

        // 해군 2 체포 응답 제한시간 초과
        if (message.equals("ARREST_MARINE_TWO_TIME_OUT")) {
            arrestResponseTimeOut(gameId, game, GameRole.MARINE_TWO);
        }

        // 2초 타이머 경과 (해군 2 조사 또는 체포 -> 해군 3 이동)
        if (message.equals("READY_MOVE_MARINE_THREE")) {
            moveRenderTimeOut(gameId, game, GameRole.MARINE_THREE);
        }

        // 해군 3 이동 응답 제한시간 초과
        if (message.equals("MOVE_MARINE_THREE_TIME_OUT")) {
            moveResponseTimeOut(gameId, game, GameRole.MARINE_THREE);
        }

        // 2초 타이머 경과 (해군 3 이동 -> 해군 3 조사 or 체포 선택)
        if (message.equals("READY_SELECT_WORK_MARINE_THREE")) {
            moveToSelectRenderTimeOut(gameId, game, GameRole.MARINE_THREE);
        }

        // 해군 3 행동 선택 응답 제한시간 초과
        if (message.equals("SELECT_WORK_MARINE_THREE_TIME_OUT")) {
            selectResponseTimeOut(gameId, game, GameRole.MARINE_THREE);
        }

        // 조사 선택시
        // 0.1초 타이머 경과 (해군 3 행동 선택 -> 해군 3 조사)
        if (message.equals("READY_INVESTIGATE_MARINE_THREE")) {
            investigateRenderTimeOut(gameId, game, GameRole.MARINE_THREE);
        }

        // 해군 3 조사 응답 제한시간 초과
        if (message.equals("INVESTIGATE_MARINE_THREE_TIME_OUT")) {
            Integer nextNode = investigateResponseTimeOut(gameId, game, GameRole.MARINE_THREE);
            // 조사할 노드가 남아 있으면
            if (nextNode != null) {
                // 조사 진행
                marineInvestigate(gameId, game, GameRole.MARINE_THREE, nextNode);
            }
        }

        // 0.1초 타이머 경과 (해군 3 행동 선택 -> 해군 3 체포)
        if (message.equals("READY_ARREST_MARINE_THREE")) {
            arrestRenderTimeOut(gameId, game, GameRole.MARINE_THREE);
        }

        // 해군 3 체포 응답 제한시간 초과
        if (message.equals("ARREST_MARINE_THREE_TIME_OUT")) {
            arrestResponseTimeOut(gameId, game, GameRole.MARINE_THREE);
        }

        // 턴 종료 로직 수행
        if (message.equals("READY_TURN_OVER")) {
            // 해적이 보물상자에 도착했는가?
            // 도착했다면
            if (game.getTreasures().containsKey(game.getCurrentPosition()[0])) {
                // 해당 보물상자 열어주기
                game.getTreasures().put(game.getCurrentPosition()[0], true);
                // 라운드 + 1
                game.increaseRound();
                if (game.getRound() > 4) {
                    // 4라운드 종료, 해적 승리, 게임 종료 알림
                    sendMessageWithGame(gameId, game, "GAME_OVER_PIRATE_WIN");
                    gameService.gameOver(gameId, true);
                } else {
                    // 라운드 종료 알림
                    sendMessageWithGame(gameId, game, "ROUND_OVER");
                    // 턴 초기화
                    game.setTurn(1);
                    // 맵 초기화
                    game.getPirateRoute().clear();
                    game.getInvestigateSuccess().clear();
                    // 해적 이동으로 보내기 (2초 타이머 실행)
                    gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_PIRATE");
                    }
                }
            // 해적이 보물상자에 도착하지 않았다면
            else {
                // 턴 + 1
                game.increaseTurn();
                // 15턴을 넘어간다면 (보물상자에 도착하지 못했으므로 해군 승리)
                if (game.getTurn() > 15) {
                    sendMessageWithGame(gameId, game, "GAME_OVER_FIFTEEN_TURN_OVER_MARINE_WIN");
                    gameService.gameOver(gameId, false);
                } else {
                    // 턴 종료 알림
                    sendMessageWithGame(gameId, game, "TURN_OVER");
                    // 해적 이동으로 보내기 (2초 타이머 실행)
                    gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_PIRATE");
                }
            }
        }
    }

    // 해군 시작위치 지정 응답 이후
    private void afterInitResponse(String gameId, Game game, GameRole role, int node) {
        // 제한시간 내로 선택을 한 것이므로 타이머 취소
        gameTimerService.cancelTimer(gameId);
        // 입력받은 노드 저장
        int[] currentPosition = gameService.initMarineStart(gameId, role.getRoleNumber(), node);
        // 이미 선택된 노드면 선택 불가
        if (currentPosition == null) {
            sendMessageWithGame(gameId, game, role+"_ALREADY_SELECTED_NODE");
            // 응답 허용
            lockRespond = false;
            // 다시 15초 타이머 시작
            gameTimerService.startResponseWaitingTimer(gameId, "INIT_"+role+"_START_TIME_OUT");
            return;
        }
        // 올바르게 선택했다면 해군 시작위치 지정완료 브로드캐스트 (서 -> 클)
        if (role == GameRole.MARINE_THREE) {
            // 해적 시작위치 보물상자 열어주기
            game.getTreasures().put(game.getCurrentPosition()[0], true);
        }
        sendMessageWithGame(gameId, game, "ACTION_INIT_"+role+"_START");
        // 2초 타이머 시작
        if (role == GameRole.MARINE_THREE) {
            // 해군 3 시작위치 지정 후 8초 기다려야 함
            gameTimerService.afterInitTimer(gameId, "READY_MOVE_"+role.getNextRole());
        } else {
            gameTimerService.startRenderWaitingTimer(gameId, "READY_INIT_"+role.getNextRole()+"_START");
        }
    }

    // 게임 시작시 (게임 시작 ~ 해군3 시작위치 지정)
    @MessageMapping("/init")
    public void init(ClientInitMessage message) {
        String gameId = message.getGameId();
        Game game = board.getGameMap().get(gameId);

        // 게임 시작 (클 -> 서)
        if (message.getMessage().equals("START_GAME") && !isStarted) {
            isStarted = true;
            // 게임 시작하면 방 폭파
            board.getRoomMap().remove(gameId);
            // 해적 시작위치 지정 (서 -> 클)
            sendMessageWithGame(gameId, game, "ORDER_INIT_PIRATE_START");
            // 응답 허용
            lockRespond = false;
            // 15초 타이머 시작
            gameTimerService.startResponseWaitingTimer(gameId, "INIT_PIRATE_START_TIME_OUT");
        }

        // 해적 시작 지점 지정완료 (클 -> 서)
        if (message.getMessage().equals("INIT_PIRATE_START") && !lockRespond) {
            // 제한시간 내로 선택을 한 것이므로 타이머 취소
            gameTimerService.cancelTimer(gameId);
            // 입력받은 노드 저장
            gameService.initPirateStart(gameId, message.getNode());
            // 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INIT_PIRATE_START");
            // 2초 타이머 시작
            gameTimerService.startRenderWaitingTimer(gameId, "READY_INIT_MARINE_ONE_START");
        }

        // 해군 1 시작 지점 지정완료 (클 -> 서)
        if (message.getMessage().equals("INIT_MARINE_ONE_START") && !lockRespond) {
            afterInitResponse(gameId, game, GameRole.MARINE_ONE, message.getNode());
        }

        // 해군 2 시작 지점 지정완료 (클 -> 서)
        if (message.getMessage().equals("INIT_MARINE_TWO_START") && !lockRespond) {
            afterInitResponse(gameId, game, GameRole.MARINE_TWO, message.getNode());
        }

        // 해군 3 시작 지점 지정완료 (클 -> 서)
        if (message.getMessage().equals("INIT_MARINE_THREE_START") && !lockRespond) {
            afterInitResponse(gameId, game, GameRole.MARINE_THREE, message.getNode());
        }
    }

    // 이동 응답 이후
    private void afterMove(String gameId, Game game, GameRole role, int node) {
        // 제한시간 내로 선택을 한 것이므로 타이머 취소
        gameTimerService.cancelTimer(gameId);
        HashMap<Integer, Deque<Integer>> availableNode;
        // 이동 경로 재예상
        if (role == GameRole.PIRATE) {
            availableNode = gameService.findPirateAvailableNode(gameId, game.getCurrentPosition()[role.getRoleNumber()]);
        } else {
            availableNode = gameService.findMarineAvailableNode(gameId, game.getCurrentPosition()[role.getRoleNumber()]);
        }
        // 입력받은 노드 저장
        gameService.move(gameId, node, role.getRoleNumber());
        // 이동 완료 브로드캐스트 (서 -> 클)
        sendMessageWithAvailableNode(gameId, game,"ACTION_MOVE_"+role, availableNode);
        // 2초 타이머 시작
        if (role == GameRole.PIRATE) {
            gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_"+role.getNextRole());
        } else {
            gameTimerService.startRenderWaitingTimer(gameId, "READY_SELECT_WORK_"+role);
        }
    }

    // 행동 선택 응답 이후
    private void afterSelect(String gameId, Game game, GameRole role, String action) {
        // 제한시간 내로 선택을 한 것이므로 타이머 취소
        gameTimerService.cancelTimer(gameId);
        // 조건 분기 (조사를 선택했을 경우)
        if (action.equals("INVESTIGATE")) {
            // 해군 행동 선택완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game,"ACTION_SELECT_WORK_"+role+"_INVESTIGATE");
            // 0.1초 타이머 시작
            gameTimerService.afterSelectTimer(gameId, "READY_INVESTIGATE_"+role);
        }
        // 조건 분기 (체포를 선택했을 경우)
        else if (action.equals("ARREST")) {
            // 해군 행동 선택완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game,"ACTION_SELECT_WORK_"+role+"_ARREST");
            // 0.1초 타이머 시작
            gameTimerService.afterSelectTimer(gameId, "READY_ARREST_"+role);
        }
    }

    // 체포 응답 이후
    private void afterArrest(String gameId, Game game, GameRole role, int node) {
        // 제한시간 내로 선택을 한 것이므로 타이머 취소
        gameTimerService.cancelTimer(gameId);
        // 체포 성공여부 확인
        boolean isArrestSuccess = gameService.arrest(gameId, node);
        // 체포 성공 시 게임 종료
        if (isArrestSuccess) {
            // 게임종료 (해군 승리) 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game,"GAME_OVER_"+role+"_ARREST_SUCCESS");
            gameService.gameOver(gameId, false);
        }
        // 체포 실패 시 게임 진행
        else {
            // 해군 체포 실패 브로드캐스트 (서 -> 클)
            sendMessageWithArrestTriedNode(gameId, game, "ACTION_ARREST_"+role+"_FAIL", node);
            // 2초 타이머 시작
            if (role == GameRole.MARINE_THREE) {
                gameTimerService.startRenderWaitingTimer(gameId, "READY_TURN_OVER");
            } else {
                gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_"+role.getNextRole());
            }
        }
    }

    // 게임 로직
    @MessageMapping("/game")
    public void marine(ClientMoveMessage message) {
        String gameId = message.getGameId();
        Game game = board.getGameMap().get(gameId);

        // 해적 이동 완료 (클 -> 서)
        if (message.getMessage().equals("MOVE_PIRATE") && !lockRespond) {
            afterMove(gameId, game, GameRole.PIRATE, message.getNode());
        }

        // 해군 1 이동 완료 (클 -> 서)
        if (message.getMessage().equals("MOVE_MARINE_ONE") && !lockRespond) {
            afterMove(gameId, game, GameRole.MARINE_ONE, message.getNode());
        }

        // 해군 1 행동 선택 완료
        if (message.getMessage().equals("SELECT_WORK_MARINE_ONE") && !lockRespond) {
            afterSelect(gameId, game, GameRole.MARINE_ONE, message.getAction());
        }

        // 해군 1 조사 완료
        if (message.getMessage().equals("INVESTIGATE_MARINE_ONE") && !lockRespond) {
            // 제한시간 내로 선택을 한 것이므로 타이머 취소
            gameTimerService.cancelTimer(gameId);
            // 조사 진행
            marineInvestigate(gameId, game, GameRole.MARINE_ONE, message.getNode());
        }

        // 해군 1 체포 시도 완료
        if (message.getMessage().equals("ARREST_MARINE_ONE") && !lockRespond) {
            afterArrest(gameId, game, GameRole.MARINE_ONE, message.getNode());
        }

        // 해군 2 이동 완료 (클 -> 서)
        if (message.getMessage().equals("MOVE_MARINE_TWO") && !lockRespond) {
            afterMove(gameId, game, GameRole.MARINE_TWO, message.getNode());
        }

        // 해군 2 행동 선택 완료
        if (message.getMessage().equals("SELECT_WORK_MARINE_TWO") && !lockRespond) {
            afterSelect(gameId, game, GameRole.MARINE_TWO, message.getAction());
        }

        // 해군 2 조사 완료
        if (message.getMessage().equals("INVESTIGATE_MARINE_TWO") && !lockRespond) {
            // 제한시간 내로 선택을 한 것이므로 타이머 취소
            gameTimerService.cancelTimer(gameId);
            // 조사 진행
            marineInvestigate(gameId, game, GameRole.MARINE_TWO, message.getNode());
        }

        // 해군 2 체포 시도 완료
        if (message.getMessage().equals("ARREST_MARINE_TWO") && !lockRespond) {
            afterArrest(gameId, game, GameRole.MARINE_TWO, message.getNode());
        }

        // 해군 3 이동 완료 (클 -> 서)
        if (message.getMessage().equals("MOVE_MARINE_THREE") && !lockRespond) {
            afterMove(gameId, game, GameRole.MARINE_THREE, message.getNode());
        }

        // 해군 3 행동 선택 완료
        if (message.getMessage().equals("SELECT_WORK_MARINE_THREE") && !lockRespond) {
            afterSelect(gameId, game, GameRole.MARINE_THREE, message.getAction());
        }

        // 해군 3 조사 완료
        if (message.getMessage().equals("INVESTIGATE_MARINE_THREE") && !lockRespond) {
            // 제한시간 내로 선택을 한 것이므로 타이머 취소
            gameTimerService.cancelTimer(gameId);
            // 조사 진행
            marineInvestigate(gameId, game, GameRole.MARINE_THREE, message.getNode());
        }

        // 해군 3 체포 시도 완료
        if (message.getMessage().equals("ARREST_MARINE_THREE") && !lockRespond) {
            afterArrest(gameId, game, GameRole.MARINE_THREE, message.getNode());
        }
    }

    // 매칭
    @EventListener
    public void listenMatching(MatchingEvent event) {
        String gameId = event.getGameId();
        Room room = board.getRoomMap().get(gameId);

        ServerMessage serverMessage = ServerMessage.builder()
                .gameId(gameId)
                .room(room)
                .message("MATCHING_SUCCESS")
                .build();

        // 게임에 속한 플레이어들에게 메시지 전송
        for (int i=0; i<room.getGameMode().playerLimit(); i++) {
            String nickname = room.getInRoomPlayers().get(i).getNickname();
            sendingOperations.convertAndSend("/sub/"+ nickname, serverMessage);
        }

        // 이후 프론트는 MATCHING_SUCCESS를 받으면 수락-거절을 띄우고 다시 요청을 서버한테 보낸다.
    }

    // 채팅
    @MessageMapping("/chat/{gameId}")
    public void chat(@DestinationVariable String gameId, ClientMessage message) {

        Game game = board.getGameMap().get(gameId);
        int role = game.getPlayerRoleByNickname(message.getSender());

        Chat chat = Chat.builder()
                .gameId(gameId)
                .sender(message.getSender())
                .role(role)
                .message("CHATTING")
                .chatMessage(message.getMessage())
                .build();

        sendingOperations.convertAndSend("/sub/"+ gameId, chat);
    }
}
