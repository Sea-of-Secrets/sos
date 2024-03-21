package com.ssafy.sos.game.controller;

import com.ssafy.sos.game.domain.Board;
import com.ssafy.sos.game.domain.Game;
import com.ssafy.sos.game.domain.Room;
import com.ssafy.sos.game.message.client.ClientMessage;
import com.ssafy.sos.game.message.client.ClientInitMessage;
import com.ssafy.sos.game.message.client.ClientMoveMessage;
import com.ssafy.sos.game.message.server.ServerMessage;
import com.ssafy.sos.game.service.GameService;
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
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class MessageController {
    private final SimpMessageSendingOperations sendingOperations;
    private final Board board;
    private final GameService gameService;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        String sessionId = Objects.requireNonNull(
                event.getMessage().getHeaders().get("simpSessionId"),
                "message: session ID is null")
                .toString();

        board.getSessionMap().put(sessionId, new ArrayList<>());
    }

    @EventListener
    public void handleDisconnectEvent(SessionDisconnectEvent event) {
        System.out.println(event.getMessage());
        // TODO: 소켓 끊기면 session ID를 통해 브로드캐스팅
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
            room.getInRoomPlayers().remove(nickname);
            ServerMessage serverMessage = ServerMessage.builder()
                    .message("PLAYER_LEAVED")
                    .gameId(gameId)
                    .room(room)
                    .build();
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        }

        Game game = board.getGameMap().get(gameId);

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

            }
        }

    }

    @MessageMapping("/game")
    public void game(ClientMessage message) throws Exception {
        System.out.println(message);

        //브로드캐스팅 코드
        //추가로 채널링 해줘야함
        sendingOperations.convertAndSend("/sub", message);
    }

    @MessageMapping("/room")
    public void enterRoom(ClientMessage message, StompHeaderAccessor accessor) {
        System.out.println(message);
        String sender = message.getSender();
        String sessionId = accessor.getSessionId();

        ServerMessage serverMessage;
        String gameId = message.getGameId();
        Room room = board.getRoomMap().get(gameId);

        if (message.getMessage().equals("ENTER_ROOM")) {

            if (board.getRoomMap().get(gameId).getInRoomPlayers().contains(sender)) {
                board.getSessionMap().get(sessionId).add(sender);
                board.getSessionMap().get(sessionId).add(gameId);
                System.out.println("Session Info : " + board.getSessionMap().get(sessionId));

                serverMessage = ServerMessage.builder()
                        .message("ENTER_SUCCESS")
                        .gameId(gameId)
                        .game(board.getGameMap().get(gameId))
                        .room(board.getRoomMap().get(gameId))
                        .build();
            } else {
                serverMessage = ServerMessage.builder()
                        .message("ENTER_FAILURE")
                        .gameId(gameId)
                        .build();
            }

            // 서버 메시지 출력
            System.out.println(serverMessage);
            if (serverMessage != null) {
                sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
            }

            // 정원이 다 찼을 경우 시작버튼 활성화 broadcast
            if (room.getInRoomPlayers().size() == 4) {
                serverMessage = ServerMessage.builder()
                        .message("PREPARE_GAME_START")
                        .build();

                sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
            }
        }

        // 게임 시작 버튼 클릭
        if (message.getMessage().equals("GAME_START")) {
            serverMessage = ServerMessage.builder()
                    .message("GAME_START")
                    .build();
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        }

        // 렌더 완료 청취 - 4명 모두 완료시 게임 시작 안내
        if (message.getMessage().equals("RENDERED_COMPLETE")) {
            room.increaseIsRendered();

            // 처음으로 렌더를 완료한 사용자가 등장한다면
            if (room.getIsRendered() == 1) {
                gameService.gameStart(gameId);
            }
            // 게임 정보 전송
            Game game = board.getGameMap().get(gameId);
            serverMessage = ServerMessage.builder()
                    .message("RENDER_COMPLETE_ACCEPTED")
                    .gameId(gameId)
                    .game(game)
                    .build();
            System.out.println(serverMessage);
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);

            if (room.getIsRendered() == 4) {
                serverMessage = ServerMessage.builder()
                        .message("ALL_RENDERED_COMPLETED")
                        .build();
                sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
            }
        }

        if (message.getMessage().equals("LEAVE_ROOM")) {
            board.getSessionMap().get(sessionId).clear();
            // 방에 혼자 남아있었으면 방 폭파
            if (room.getInRoomPlayers().size() == 1) {
                board.getRoomMap().remove(gameId);
            } else {
                // 다음 들어온 사람에게 방장 넘김
                if (room.getHost().equals(sender)) {
                    room.setHost(room.getInRoomPlayers().get(1));
                }
                room.getInRoomPlayers().remove(sender);
            }

            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .room(room)
                    .message("PLAYER_LEAVED")
                    .build();

            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        }
    }
    
    @MessageMapping("/init")
    public void init(ClientInitMessage message) {

        System.out.println(message);
        String gameId = message.getGameId();
        String sender = message.getSender();
        Game game = board.getGameMap().get(gameId);

        ServerMessage serverMessage = null;
        // 해적 시작 지점 지정
        if (message.getMessage().equals("INIT_PIRATE_START")) {
            // TODO: 제한 시간 지나면 시작 위치 랜덤 지정 해주기
            gameService.initPirateStart(gameId, message.getNode());
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("INIT_PIRATE_START")
                    .game(game)
                    .build();
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
        String sender = message.getSender();
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
        String sender = message.getSender();
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

    //서버 타이머  제공
    @Scheduled(fixedRate = 1000)
    public void sendServerTime() throws Exception {
    }
}
