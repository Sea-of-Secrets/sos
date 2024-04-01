package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Player;

public interface MatchingService {
    int getQueueSize();
    boolean enqueue(Player player);
    void matchPlayers();
    void dequeue(String nickname);
}
