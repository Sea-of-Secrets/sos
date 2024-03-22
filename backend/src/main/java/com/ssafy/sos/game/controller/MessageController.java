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
import com.ssafy.sos.game.service.GameService;
import com.ssafy.sos.game.service.GameTimerService;
import com.ssafy.sos.game.service.MatchingService;
import com.ssafy.sos.game.service.TimerTimeoutEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.Server;
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

        if (game == null) { return; }

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
            room.getInRoomPlayers().removeIf(player -> player.getNickname().equals(sender));

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

    // TODO: 타이머 테스트하는 부분 - 이후에 반드시 지울 것
    @MessageMapping("/test")
    public void test(ClientMessage message) {
        String gameId = message.getGameId();
        if (message.getMessage().equals("TIMER_START")) {
            gameTimerService.startFifteenSecondsTimer(gameId, "test: 해군 이동하시오");
        }

        if (message.getMessage().equals("TIMER_STOP")) {
            gameTimerService.cancelTimer(gameId);
        }
    }

    // 타이머가 끝났을때 이벤트를 수신받는 부분
    @EventListener
    public void listenTimeout(TimerTimeoutEvent event) {
        String gameId = event.getGameId();
        String message = event.getMessage();
        int type = event.getTimerType();
        Game game = board.getGameMap().get(gameId);
        ServerMessage serverMessage;

        // 해적 시작위치 지정 응답 제한시간 초과
        if (message.equals("INIT_PIRATE_START_TIME_OUT") && type == 15) {
            // 응답 잠그기
            lockRespond = true;
            // 응답이 오지 않았음을 클라이언트에 알리기 (서 -> 클)
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("INIT_PIRATE_START_TIME_OUT")
                    .game(game)
                    .build();
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
            // 시작위치 랜덤 지정
            gameService.initPirateRandomStart(gameId);
            // 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("ACTION_INIT_PIRATE_START")
                    .game(game)
                    .build();
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
            // 2초 타이머 시작
            gameTimerService.startTwoSecondsTimer(gameId, "READY_INIT_MARINE_ONE_START");
        }

        // 2초 타이머 경과 (해적 시작위치 지정 -> 해군1 시작위치 지정)
        if (message.equals("READY_INIT_MARINE_ONE_START") && type == 2) {
            System.out.println("다음다음");
        }
    }

    // 게임 시작시 (게임 시작 ~ 해군3 시작위치 지정)
    @MessageMapping("/init")
    public void init(ClientInitMessage message) {
        String gameId = message.getGameId();
        String sender = message.getSender();
        Game game = board.getGameMap().get(gameId);
        ServerMessage serverMessage = null;

        // 게임 시작 (클 -> 서)
        if (message.getMessage().equals("START_GAME")) {
            // sender 가 player 0번째와 똑같을때
            if (!game.getPlayers().get(0).getNickname().equals(sender)) return;

            // 게임 시작하면 방 폭파
            board.getRoomMap().remove(gameId);

            // 해적 시적 시작위치 지정 (서 -> 클)
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("ORDER_INIT_PIRATE_START")
                    .game(game)
                    .build();
            // 응답 허용
            lockRespond = false;
            // 15초 타이머 시작
            gameTimerService.startFifteenSecondsTimer(gameId, "INIT_PIRATE_START_TIME_OUT");
        }

        // 해적 시작 지점 지정완료 (클 -> 서)
        if (message.getMessage().equals("INIT_PIRATE_START") && !lockRespond) {
            // 제한시간 내로 선택을 한 것이므로 타이머 취소
            gameTimerService.cancelTimer(gameId);
            // 입력받은 노드 저장
            gameService.initPirateStart(gameId, message.getNode());
            // 해적 시작위치 지정완료 브로드캐스트 (서 -> 클)
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("ACTION_INIT_PIRATE_START")
                    .game(game)
                    .build();
            // 2초 타이머 시작
            gameTimerService.startTwoSecondsTimer(gameId, "READY_INIT_MARINE_ONE_START");
        }

        // 해군 시작 지점 지정
        if (message.getMessage().equals("INIT_MARINE_START")) {
            // TODO: 역할은 턴에 맞게 자동으로 지정 해주기
            int role = 1;
            gameService.initMarineStart(gameId, role, message.getNode());
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("INIT_MARINE_START")
                    .game(game)
                    .build();
        }

        if (serverMessage != null) {
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        }
    }

    @MessageMapping("/move")
    public void move(ClientMoveMessage message) {
        System.out.println(message);
        String gameId = message.getGameId();
        Game game = board.getGameMap().get(gameId);

        ServerMessage serverMessage = null;
        if (message.getMessage().equals("MOVE_PIRATE")) {
            // TODO: 해적 이동 알고리즘 추가
            gameService.move(gameId, message.getNode(), 0);
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("MOVE_PIRATE")
                    .game(game)
                    .build();
        }

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
        // TODO: 매칭된 플레이어들에게 메시지 전송
        ServerMessage serverMessage = ServerMessage.builder().build();
    }
    //서버 타이머  제공
    @Scheduled(fixedRate = 1000)
    public void sendServerTime() throws Exception {
    }
}
