package com.ssafy.sos.game.service;

public interface GameTimerService {
    void startFifteenSecondsTimer(String gameId, String message);
    void startTwoSecondsTimer(String gameId, String message);
    void cancelTimer(String gameId);
}
