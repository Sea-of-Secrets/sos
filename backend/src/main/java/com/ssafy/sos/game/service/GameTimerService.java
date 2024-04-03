package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Room;

public interface GameTimerService {
    void startResponseWaitingTimer(String gameId, String message);
    void startRenderWaitingTimer(String gameId, String message);
    void afterMatchingTimer(String gameId, String message);
    void beforePrepareGameStart(String gameId, String message);
    void afterInitTimer(String gameId, String message);
    void afterSelectTimer(String gameId, String message);
    void cancelTimer(String gameId);
}
