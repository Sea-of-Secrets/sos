package com.ssafy.sos.game.service;

public interface GameTimerService {
    void startResponseWaitingTimer(String gameId, String message);
    void startRenderWaitingTimer(String gameId, String message);
    void afterInitTimer(String gameId, String message);
    void cancelTimer(String gameId);
}
