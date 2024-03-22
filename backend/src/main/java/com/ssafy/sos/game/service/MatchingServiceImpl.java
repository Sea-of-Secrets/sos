package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Player;
import com.ssafy.sos.game.domain.Room;
import com.ssafy.sos.game.event.MatchingEvent;
import com.ssafy.sos.game.util.GameMode;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {
    private final Queue<Player> matchingQueue = new LinkedList<>();
    private final GameService gameService;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private final ApplicationEventPublisher eventPublisher;
    private ScheduledFuture<?> future;

    public int getQueueSize() {
        return matchingQueue.size();
    }

    @Override
    public void enqueue(Player player) {
        matchingQueue.add(player);
        if (matchingQueue.size() >= 2) {
            matchPlayers();
        }
    }

    @Override
    public void matchPlayers() {
        Player playerOne = matchingQueue.poll();
        Player playerTwo = matchingQueue.poll();
        System.out.println(playerOne);
        System.out.println(playerTwo);

        // 첫번째 플레이어를 호스트로 방을 만들고 두번째 플레이어 방에 입장
        Room room = gameService.makeRoom(playerOne, GameMode.ONE_VS_ONE);
        gameService.enterRoom(room.getGameId(), playerTwo);
        eventPublisher.publishEvent(new MatchingEvent(this, room.getGameId(), playerOne, playerTwo));
    }

}
