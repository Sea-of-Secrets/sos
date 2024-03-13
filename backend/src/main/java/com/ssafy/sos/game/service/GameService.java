package com.ssafy.sos.game.service;

import java.util.HashMap;
import java.util.List;
import java.util.Stack;

public interface GameService {
    int[] setPirateTreasure(String gameId);
    int initPirateStart(String gameId, int selectedNode);
    int initPirateRandomStart(String gameId);
    HashMap<Integer, Stack<Integer>> findPirateAvailableNode(String gameId, int nodeNumber);
    int[] initMarineStart(String gameId, int MarineNumber, int selectedNode);
    int[] initMarineStartRandom(String gameId, int MarineNumber);
    HashMap<Integer, List<Integer>> findMarineAvailableNode(String gameId, int nodeNumber);
}
