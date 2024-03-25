package com.ssafy.sos.game.domain;

import org.springframework.stereotype.Component;
import java.util.LinkedList;
import java.util.Queue;

@Component
public class MatchingQueue {
    private final Queue<Player> queue = new LinkedList<>();

    public synchronized void enqueue(Player player) {
        queue.add(player);
        tryMatch();
    }

    public synchronized void tryMatch() {
        if (queue.size() >= 2) {
            Player player1 = queue.poll();
            Player player2 = queue.poll();
//            matchPlayers(player1, player2);
        }
    }
}