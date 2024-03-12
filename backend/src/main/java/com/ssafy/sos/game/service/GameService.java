package com.ssafy.sos.game.service;

import java.util.HashMap;
import java.util.Stack;

public interface GameService {
    int[] setPirateTreasure();
    int initPirateStart(int selectedNode);
    int initPirateRandomStart();
    HashMap<Integer, Stack<Integer>> findPirateAvailableNode(int nodeNumber);
    int[] initMarineStart(int MarineNumber, int selectedNode);
    int[] initMarineStartRandom(int MarineNumber);
    int[] findMarineAvailableNode(int nodeNumber);
}
