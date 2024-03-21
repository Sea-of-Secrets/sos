package com.ssafy.sos.game.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class GameTimerServiceImpl implements GameTimerService {
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private final ApplicationEventPublisher eventPublisher;
    private ScheduledFuture<?> future;

    @Override
    public void startFifteenSecondsTimer(String gameId, String message) {
        future = scheduler.schedule(() -> {
            eventPublisher.publishEvent(new TimerTimeoutEvent(this, gameId, message, 15));
        }, 15, TimeUnit.SECONDS);
    }

    @Override
    public void startTwoSecondsTimer(String gameId, String message) {
        future = scheduler.schedule(() -> {
            eventPublisher.publishEvent(new TimerTimeoutEvent(this, gameId, message, 2));
        }, 2, TimeUnit.SECONDS);
    }

    @Override
    public void cancelTimer(String gameId) {
        if (future != null && !future.isDone()) {
            // 예약된 타이머 취소
            future.cancel(false);
            System.out.println("타이머 중단됨");
        }
    }
}
