package com.ssafy.sos.game.service;

import com.ssafy.sos.game.event.TimerTimeoutEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.concurrent.*;

@Service
@RequiredArgsConstructor
public class GameTimerServiceImpl implements GameTimerService {
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private final ApplicationEventPublisher eventPublisher;
    private final ConcurrentHashMap<String, ScheduledFuture<?>> futures = new ConcurrentHashMap<>();

    @Override
    public void startResponseWaitingTimer(String gameId, String message) {
        ScheduledFuture<?> future = scheduler.schedule(() ->
                eventPublisher.publishEvent(new TimerTimeoutEvent(this, gameId, message)), 15, TimeUnit.SECONDS);
        futures.put(gameId, future);
    }

    @Override
    public void startRenderWaitingTimer(String gameId, String message) {
        ScheduledFuture<?> future = scheduler.schedule(() ->
                eventPublisher.publishEvent(new TimerTimeoutEvent(this, gameId, message)), 3, TimeUnit.SECONDS);
        futures.put(gameId, future);
    }

    @Override
    public void afterMatchingTimer(String gameId, String message) {
        ScheduledFuture<?> future = scheduler.schedule(() ->
                eventPublisher.publishEvent(new TimerTimeoutEvent(this, gameId, message)), 1, TimeUnit.SECONDS);
        futures.put(gameId, future);
    }

    @Override
    public void beforePrepareGameStart(String gameId, String message) {
        ScheduledFuture<?> future = scheduler.schedule(() ->
                eventPublisher.publishEvent(new TimerTimeoutEvent(this, gameId, message)), 1, TimeUnit.SECONDS);
        futures.put(gameId, future);
    }

    @Override
    public void afterInitTimer(String gameId, String message) {
        ScheduledFuture<?> future = scheduler.schedule(() ->
                eventPublisher.publishEvent(new TimerTimeoutEvent(this, gameId, message)), 8, TimeUnit.SECONDS);
        futures.put(gameId, future);
    }

    @Override
    public void afterSelectTimer(String gameId, String message) {
        ScheduledFuture<?> future = scheduler.schedule(() ->
                eventPublisher.publishEvent(new TimerTimeoutEvent(this, gameId, message)), 1, TimeUnit.SECONDS);
        futures.put(gameId, future);
    }

    @Override
    public void cancelTimer(String gameId) {
        ScheduledFuture<?> future = futures.remove(gameId);
        if (future != null && !future.isDone()) {
            future.cancel(false);
        }
    }

}
