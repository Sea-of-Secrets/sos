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
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

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

    }

    @EventListener
    public void handleDisconnectEvent(SessionDisconnectEvent event) {

    }

    @MessageMapping("/game")
    public void game(ClientMessage message) throws Exception {
        System.out.println(message);

        //브로드캐스팅 코드
        //추가로 채널링 해줘야함
        sendingOperations.convertAndSend("/sub", message);
    }

    @MessageMapping("/room")
    public void enterRoom(ClientMessage message) {
        System.out.println(message);
        String sender = message.getSender();

        ServerMessage serverMessage = null;
        String gameId = message.getGameId();
        Room room = board.getRoomMap().get(gameId);

        if (message.getMessage().equals("ENTER_ROOM")) {

            if (board.getRoomMap().get(gameId).getInRoomPlayers().contains(sender)) {
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
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);

            if (room.getIsRendered() == 4) {
                serverMessage = ServerMessage.builder()
                        .message("ALL_RENDERED_COMPLETED")
                        .build();
                sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
            }
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
            gameService.initPirateStart(gameId, message.getNode());
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("INIT_PIRATE_START")
                    .game(game)
                    .build();
        }

        // 해군 시작 지점 지정
        if (message.getMessage().equals("INIT_MARINE_START")) {
            gameService.initMarineStart(gameId, game.getPlayers().get(sender), message.getNode());
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("INIT_MARINE_START")
                    .game(game)
                    .build();
        }

        if (serverMessage != null) {
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        } else {
            throw new RuntimeException();
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
        } else {
            throw new RuntimeException();
        }
    }

    @MessageMapping("/increase")
    public void turnRoundIncrease(ClientMessage message) {
        System.out.println(message);
        String gameId = message.getGameId();
        Game game = board.getGameMap().get(gameId);

        ServerMessage serverMessage = null;
        if (message.getMessage().equals("INCREASE_TURN")) {
            game.increaseTurn();
            serverMessage = ServerMessage.builder()
                    .gameId(gameId)
                    .message("INCREASE_TURN")
                    .game(game)
                    .build();
        }

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
        } else {
            throw new RuntimeException();
        }
    }

    //서버 타이머  제공
    @Scheduled(fixedRate = 1000)
    public void sendServerTime() throws Exception {
    }
}
