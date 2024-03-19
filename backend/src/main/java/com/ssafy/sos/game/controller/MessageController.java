package com.ssafy.sos.game.controller;

import com.ssafy.sos.game.domain.Board;
import com.ssafy.sos.game.domain.Game;
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
    public void makeRoom(ClientMessage message) {
        System.out.println(message);
        String sender = message.getSender();

        ServerMessage serverMessage = null;
        String gameId = null;

        if (message.getMessage().equals("ENTER_ROOM")) {
            gameId = message.getGameId();
            if (board.getRoomMap().get(gameId).getInRoomPlayers().containsKey(sender)) {
                serverMessage = ServerMessage.builder()
                        .message("ENTER_SUCCESS")
                        .gameId(gameId)
                        .game(board.getGameMap().get(gameId))
                        .build();
            } else {
                serverMessage = ServerMessage.builder()
                        .message("ENTER_FAILURE")
                        .gameId(gameId)
                        .build();
            }
        }

        System.out.println(serverMessage);
        if (serverMessage != null) {
            sendingOperations.convertAndSend("/sub/" + gameId, serverMessage);
        } else {
            throw new RuntimeException();
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

    //서버 타이머  제공
    @Scheduled(fixedRate = 1000)
    public void sendServerTime() throws Exception {
    }
}
