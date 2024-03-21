package com.ssafy.sos.game.util;

public enum GameMode {
    ONE_VS_ONE(2), ONE_VS_THREE(4);

    private final int playerLimit;

    GameMode(int playerLimit) {
        this.playerLimit = playerLimit;
    }

    public int playerLimit() {
        return playerLimit;
    }
}
