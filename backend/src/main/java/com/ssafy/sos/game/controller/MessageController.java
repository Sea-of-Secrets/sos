package com.ssafy.sos.game.controller;

import com.ssafy.sos.game.domain.Board;
import com.ssafy.sos.game.domain.Game;
import com.ssafy.sos.game.domain.Player;
import com.ssafy.sos.game.domain.Room;
import com.ssafy.sos.game.event.MatchingEvent;
import com.ssafy.sos.game.message.client.ClientMessage;
import com.ssafy.sos.game.message.client.ClientInitMessage;
import com.ssafy.sos.game.message.client.ClientMoveMessage;
import com.ssafy.sos.game.message.server.ServerMessage;
import com.ssafy.sos.game.message.server.ServerPirateMessage;
import com.ssafy.sos.game.service.GameService;
import com.ssafy.sos.game.service.GameTimerService;
import com.ssafy.sos.game.service.MatchingService;
import com.ssafy.sos.game.event.TimerTimeoutEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import java.util.*;

@Controller
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class MessageController {
    private final SimpMessageSendingOperations sendingOperations;
    private final Board board;
    private final GameService gameService;
    private final GameTimerService gameTimerService;
    private final MatchingService matchingService;

    // 응답이 왔는지 여부를 판단할 flag
    private boolean lockRespond;

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
        System.out.println(event.getMessage());
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        List<String> sessionMemberGame= board.getSessionMap().getOrDefault(sessionId, null);

        System.out.println(sessionMemberGame);
        if (sessionMemberGame == null) return;

        String gameId = sessionMemberGame.get(0);
        String nickname = sessionMemberGame.get(1);

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

        Game game = board.getGameMap().getOrDefault(gameId, null);

        if (game == null) return;

        switch (game.getGameStatus()) {
            // 렌더링 중에 퇴장한 경우
            case BEFORE_START -> {

            }
            // 게임 중에 나가진 경우
            case IN_GAME -> {

            }
            // 게임이 끝나서 소켓을 끊은 경우
            case GAME_FINISHED -> {
                // 게임 종료는 꼭 한명만 시켜야 됨 -> 안 그러면 게임 삭제 요청 4번 감
                if (game.getPlayers().get(0).getNickname().equals(nickname)) {
                    System.out.println("--FINISH");
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
                    System.out.println(acceptPlayer.getNickname());

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
    public void manageRoom(ClientMessage message, StompHeaderAccessor accessor) {
        String sender = message.getSender();
        String sessionId = accessor.getSessionId();

        ServerMessage serverMessage = null;
        String gameId = message.getGameId();
        Room room = board.getRoomMap().get(gameId);
        List<String> sessionInfo = board.getSessionMap().get(sessionId);
        // 존재하지 않는 방이라면
        if (room == null) return;

        // 방 입장 (클 -> 서)
        if (message.getMessage().equals("ENTER_ROOM")) {
            for (Player player : room.getInRoomPlayers()) {
                if (player.getNickname().equals(sender)) {
                    sessionInfo.add(sender);
                    sessionInfo.add(gameId);

                    System.out.println("Session Info : " + sessionInfo);

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
                    .gameId(gameId)
                    .game(game)
                    .build();
            System.out.println(serverMessage);
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);

            // 방에 있는 모두의 렌더가 완료되면 알림 (서 -> 클)
            if (room.getIsRendered() == game.getGameMode().playerLimit()) {
                serverMessage = ServerMessage.builder()
                        .message("ALL_RENDERED_COMPLETED")
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

    // 해적 이동시 필요한 정보(이동가능한 노드 조회)와 함께 메시지를 보내는 메서드
    private void sendMessageWithPirateAvailableNode(String gameId, Game game, String message, HashMap<Integer, Deque<Integer>> pirateAvailableNode) {
        ServerPirateMessage serverPirateMessage;
        serverPirateMessage = ServerPirateMessage.builder()
                .gameId(gameId)
                .message(message)
                .pirateAvailableNode(pirateAvailableNode)
                .game(game)
                .build();
        sendingOperations.convertAndSend("/sub/" + gameId, serverPirateMessage);
    }

    // 타이머가 끝남을 감지
    @EventListener
    public void listenTimeout(TimerTimeoutEvent event) {
        String gameId = event.getGameId();
        String message = event.getMessage();
        Game game = board.getGameMap().get(gameId);

        // 해적 시작위치 지정 응답 제한시간 초과
        if (message.equals("INIT_PIRATE_START_TIME_OUT")) {
            // 응답 잠그기
            lockRespond = true;
            // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
            sendMessageWithGame(gameId, game, "INIT_PIRATE_START_TIME_OUT");
            // 시작위치 랜덤 지정
            gameService.initPirateRandomStart(gameId);
            // 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INIT_PIRATE_START");
            // 2초 타이머 시작
            gameTimerService.startRenderWaitingTimer(gameId, "READY_INIT_MARINE_ONE_START");
        }

        // 2초 타이머 경과 (해적 시작위치 지정 -> 해군1 시작위치 지정)
        if (message.equals("READY_INIT_MARINE_ONE_START")) {
            // 해군1 시작위치 지정 (서 -> 클)
            sendMessageWithGame(gameId, game, "ORDER_INIT_MARINE_ONE_START");
            // 응답 허용
            lockRespond = false;
            // 15초 타이머 시작
            gameTimerService.startResponseWaitingTimer(gameId, "INIT_MARINE_ONE_START_TIME_OUT");
        }

        // 해군 1 시작위치 지정 응답 제한시간 초과
        if (message.equals("INIT_MARINE_ONE_START_TIME_OUT")) {
            // 응답 잠그기
            lockRespond = true;
            // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
            sendMessageWithGame(gameId, game, "INIT_MARINE_ONE_START_TIME_OUT");
            // 시작위치 랜덤 지정
            gameService.initMarineStartRandom(gameId, 1);
            // 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INIT_MARINE_ONE_START");
            // 2초 타이머 시작
            gameTimerService.startRenderWaitingTimer(gameId, "READY_INIT_MARINE_TWO_START");
        }

        // 2초 타이머 경과 (해군 1 시작위치 지정 -> 해군 2 시작위치 지정)
        if (message.equals("READY_INIT_MARINE_TWO_START")) {
            // 해군1 시작위치 지정 (서 -> 클)
            sendMessageWithGame(gameId, game, "ORDER_INIT_MARINE_TWO_START");
            // 응답 허용
            lockRespond = false;
            // 15초 타이머 시작
            gameTimerService.startResponseWaitingTimer(gameId, "INIT_MARINE_TWO_START_TIME_OUT");
        }

        // 해군 2 시작위치 지정 응답 제한시간 초과
        if (message.equals("INIT_MARINE_TWO_START_TIME_OUT")) {
            // 응답 잠그기
            lockRespond = true;
            // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
            sendMessageWithGame(gameId, game, "INIT_MARINE_TWO_START_TIME_OUT");
            // 시작위치 랜덤 지정
            gameService.initMarineStartRandom(gameId, 2);
            // 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INIT_MARINE_TWO_START");
            // 2초 타이머 시작
            gameTimerService.startRenderWaitingTimer(gameId, "READY_INIT_MARINE_THREE_START");
        }

        // 2초 타이머 경과 (해군 2 시작위치 지정 -> 해군 3 시작위치 지정)
        if (message.equals("READY_INIT_MARINE_THREE_START")) {
            // 해군1 시작위치 지정 (서 -> 클)
            sendMessageWithGame(gameId, game, "ORDER_INIT_MARINE_THREE_START");
            // 응답 허용
            lockRespond = false;
            // 15초 타이머 시작
            gameTimerService.startResponseWaitingTimer(gameId, "INIT_MARINE_THREE_START_TIME_OUT");
        }

        // 해군 3 시작위치 지정 응답 제한시간 초과
        if (message.equals("INIT_MARINE_THREE_START_TIME_OUT")) {
            // 응답 잠그기
            lockRespond = true;
            // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
            sendMessageWithGame(gameId, game, "INIT_MARINE_THREE_START_TIME_OUT");
            // 시작위치 랜덤 지정
            gameService.initMarineStartRandom(gameId, 3);
            // 해군 3 시작위치 지정완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INIT_MARINE_THREE_START");
            // 2초 타이머 시작
            gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_PIRATE");
        }

        // 2초 타이머 경과 (해군 3 시작위치 지정 -> 해적 이동)
        if (message.equals("READY_MOVE_PIRATE")) {
            // 해적 이동가능 위치 계산
            HashMap<Integer, Deque<Integer>> pirateAvailableNode = gameService.findPirateAvailableNode(gameId, game.getCurrentPosition()[0]);
            // 해적 이동 (서 -> 클)
            sendMessageWithPirateAvailableNode(gameId, game, "ORDER_MOVE_PIRATE", pirateAvailableNode);
            // 응답 허용
            lockRespond = false;
            // 15초 타이머 시작
            gameTimerService.startResponseWaitingTimer(gameId, "MOVE_PIRATE_TIME_OUT");
        }

        // 해적 이동 응답 제한시간 초과
        if (message.equals("MOVE_PIRATE_TIME_OUT")) {
            // 응답 잠그기
            lockRespond = true;
            // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
            sendMessageWithGame(gameId, game, "MOVE_PIRATE_TIME_OUT");
            // TODO: 해적 랜덤 위치 이동 구현해야 함
            // 시작위치 랜덤 지정
            gameService.initMarineStartRandom(gameId, 3);
            // 해군 3 시작위치 지정완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INIT_MARINE_THREE_START");
            // 2초 타이머 시작
            gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_PIRATE");
        }

        // 2초 타이머 경과 (해군 3 시작위치 지정 -> 해적 이동)
        if (message.equals("READY_MOVE_PIRATE")) {
            // 해적 이동가능 위치 계산
            HashMap<Integer, Deque<Integer>> pirateAvailableNode = gameService.findPirateAvailableNode(gameId, game.getCurrentPosition()[0]);
            // 해적 이동 (서 -> 클)
            ServerPirateMessage serverPirateMessage;
            serverPirateMessage = ServerPirateMessage.builder()
                    .gameId(gameId)
                    .message("ORDER_MOVE_PIRATE")
                    .pirateAvailableNode(pirateAvailableNode)
                    .game(game)
                    .build();
            sendingOperations.convertAndSend("/sub/" + gameId, serverPirateMessage);
            // 응답 허용
            lockRespond = false;
            // 15초 타이머 시작
            gameTimerService.startResponseWaitingTimer(gameId, "MOVE_PIRATE_TIME_OUT");
        }
    }

    // 게임 시작시 (게임 시작 ~ 해군3 시작위치 지정)
    @MessageMapping("/init")
    public void init(ClientInitMessage message) {
        String gameId = message.getGameId();
        String sender = message.getSender();
        Game game = board.getGameMap().get(gameId);

        // 게임 시작 (클 -> 서)
        if (message.getMessage().equals("START_GAME")) {
            // sender 가 player 0번째와 똑같을때
            if (!game.getPlayers().get(0).getNickname().equals(sender)) return;

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
            // 제한시간 내로 선택을 한 것이므로 타이머 취소
            gameTimerService.cancelTimer(gameId);
            // 입력받은 노드 저장
            int[] currentPosition = gameService.initMarineStart(gameId, 1, message.getNode());
            // 이미 선택된 노드면 선택 불가
            if (currentPosition == null) {
                sendMessageWithGame(gameId, game, "ALREADY_SELECTED_NODE");
                // 응답 허용
                lockRespond = false;
                // 다시 15초 타이머 시작
                gameTimerService.startResponseWaitingTimer(gameId, "INIT_MARINE_ONE_START_TIME_OUT");
                return;
            }
            // 올바르게 선택했다면 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INIT_MARINE_ONE_START");
            // 2초 타이머 시작
            gameTimerService.startRenderWaitingTimer(gameId, "READY_INIT_MARINE_TWO_START");
        }

        // 해군 2 시작 지점 지정완료 (클 -> 서)
        if (message.getMessage().equals("INIT_MARINE_TWO_START") && !lockRespond) {
            // 제한시간 내로 선택을 한 것이므로 타이머 취소
            gameTimerService.cancelTimer(gameId);
            // 입력받은 노드 저장
            int[] currentPosition = gameService.initMarineStart(gameId, 2, message.getNode());
            // 이미 선택된 노드면 선택 불가
            if (currentPosition == null) {
                sendMessageWithGame(gameId, game, "ALREADY_SELECTED_NODE");
                // 응답 허용
                lockRespond = false;
                // 다시 15초 타이머 시작
                gameTimerService.startResponseWaitingTimer(gameId, "INIT_MARINE_TWO_START_TIME_OUT");
                return;
            }
            // 올바르게 선택했다면 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INIT_MARINE_TWO_START");
            // 2초 타이머 시작
            gameTimerService.startRenderWaitingTimer(gameId, "READY_INIT_MARINE_THREE_START");
        }

        // 해군 3 시작 지점 지정완료 (클 -> 서)
        if (message.getMessage().equals("INIT_MARINE_THREE_START") && !lockRespond) {
            // 제한시간 내로 선택을 한 것이므로 타이머 취소
            gameTimerService.cancelTimer(gameId);
            // 입력받은 노드 저장
            int[] currentPosition = gameService.initMarineStart(gameId, 3, message.getNode());
            // 이미 선택된 노드면 선택 불가
            if (currentPosition == null) {
                sendMessageWithGame(gameId, game, "ALREADY_SELECTED_NODE");
                // 응답 허용
                lockRespond = false;
                // 다시 15초 타이머 시작
                gameTimerService.startResponseWaitingTimer(gameId, "INIT_MARINE_THREE_START_TIME_OUT");
                return;
            }
            // 올바르게 선택했다면 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_INIT_MARINE_THREE_START");
            // 2초 타이머 시작
            gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_PIRATE");
        }
    }

    // 해적 이동
    @MessageMapping("/pirate")
    public void pirate(ClientMoveMessage message) {
        String gameId = message.getGameId();
        Game game = board.getGameMap().get(gameId);

        // 해적 이동 완료 (클 -> 서)
        if (message.getMessage().equals("MOVE_PIRATE") && !lockRespond) {
            // 제한시간 내로 선택을 한 것이므로 타이머 취소
            gameTimerService.cancelTimer(gameId);
            // 입력받은 노드 저장
            gameService.move(gameId, message.getNode(), 0);
            // 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
            sendMessageWithGame(gameId, game, "ACTION_MOVE_PIRATE");
            // 2초 타이머 시작
            gameTimerService.startRenderWaitingTimer(gameId, "READY_MOVE_MARINE_ONE");
        }
    }

    @MessageMapping("/move")
    public void move(ClientMoveMessage message) {
        System.out.println(message);
        String gameId = message.getGameId();
        Game game = board.getGameMap().get(gameId);

        ServerMessage serverMessage = null;
        if (message.getMessage().equals("MOVE_MARINE")) {
            // TODO: 해군 이동 알고리즘 추가
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("MOVE_MARINE")
                    .game(game)
                    .build();
        }

        if (serverMessage != null) {
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        }
    }

    @MessageMapping("/increase")
    public void turnRoundIncrease(ClientMessage message) {
        System.out.println(message);
        String gameId = message.getGameId();
        Game game = board.getGameMap().get(gameId);

        ServerMessage serverMessage = null;
        if (message.getMessage().equals("INCREASE_TURN")) {
            // TODO: 해군3의 action이 끝났을 때 턴 증가하는 것으로 변경
            game.increaseTurn();
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("INCREASE_TURN")
                    .game(game)
                    .build();
        }

        // TODO: 해적이 보물을 찾았거나 15턴이 끝났을 경우로 변경
        if (message.getMessage().equals("INCREASE_ROUND")) {
            game.increaseRound();
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("INCREASE_ROUND")
                    .game(game)
                    .build();
        }

        System.out.println(serverMessage);
        if (serverMessage != null) {
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        }
    }

    @MessageMapping("/action")
    public void marineAction(ClientInitMessage message) {
        System.out.println(message);
        String gameId = message.getGameId();
        Game game = board.getGameMap().get(gameId);

        ServerMessage serverMessage;
        String resultMessage = null;
        if (message.getMessage().equals("INVESTIGATE")) {
            // TODO: 역할은 턴에 맞게 지정해주기
            int role = 1;
            resultMessage = gameService.investigate(gameId,
                    message.getNode(),
                    role)
                    ? "SUCCESS_INVESTIGATION" : "FAIL_INVESTIGATION";
        }

        if (message.getMessage().equals("ARREST")) {
            resultMessage = gameService.arrest(gameId, message.getNode())
                    ? "SUCCESS_ARREST" : "FAIL_ARREST";
        }

        if (resultMessage != null) {
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .game(game)
                    .message(resultMessage)
                    .build();

            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        }
    }

    @EventListener
    public void listenMatching(MatchingEvent event) {
        String gameId = event.getGameId();
        Room room = board.getRoomMap().get(gameId);

        // TODO: 매칭된 플레이어들에게 메시지 전송
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

        // 프론트는 MATCHING_SUCCESS를 받으면 수락-거절을 띄우고 다시 요청을 서버한테 보낸다.
    }

    //서버 타이머  제공
    @Scheduled(fixedRate = 1000)
    public void sendServerTime() throws Exception {

    }
}
