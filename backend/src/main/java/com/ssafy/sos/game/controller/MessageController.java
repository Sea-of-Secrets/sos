package com.ssafy.sos.game.controller;

import com.ssafy.sos.game.ClientMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompCommand;
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

    //서버 타이머  제공
    @Scheduled(fixedRate = 1000)
    public void sendServerTime() throws Exception {
    }
}
