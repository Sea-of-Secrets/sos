package com.ssafy.sos.game.service;

import com.ssafy.sos.game.domain.Player;
import com.ssafy.sos.game.domain.Room;
import com.ssafy.sos.game.util.GameMode;

import java.util.Deque;
import java.util.HashMap;

public interface GameService {
    void gameStart(String gameId);
    int[] setPirateTreasure(String gameId);
    int initPirateStart(String gameId, int selectedNode);
    int initPirateRandomStart(String gameId);
    HashMap<Integer, Deque<Integer>> findPirateAvailableNode(String gameId, int nodeNumber);
    int[] initMarineStart(String gameId, int MarineNumber, int selectedNode);
    int[] initMarineStartRandom(String gameId, int MarineNumber);
    HashMap<Integer, Deque<Integer>> findMarineAvailableNode(String gameId, int nodeNumber);
    boolean move(String gameId, int nodeNumber, int role);
    Room makeRoom(Player player, GameMode gameMode);
    Room enterRoom(String gameId, Player player);
    void findMarineInvestigableNode(String gameId, int role);
    boolean investigate(String gameId, int nodeNumber, int role);
    int[] findMarineArrestableNode(String gameId, int role);
    boolean arrest(String gameId, int nodeNumber);
    void gameOver(String gameId, boolean gameResult);
}
