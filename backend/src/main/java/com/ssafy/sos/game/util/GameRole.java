package com.ssafy.sos.game.util;

public enum GameRole {
    PIRATE(0),
    MARINE_ONE(1),
    MARINE_TWO(2),
    MARINE_THREE(3);

    private final int roleNumber;

    GameRole(int roleNumber) {
        this.roleNumber = roleNumber;
    }

    public int getRoleNumber() {
        return roleNumber;
    }

    public GameRole getNextRole() {
        int nextRoleNumber = (this.roleNumber + 1) % GameRole.values().length;
        return GameRole.values()[nextRoleNumber];
    }

    public static GameRole fromRoleNumber(int roleNumber) {
        for (GameRole role : GameRole.values()) {
            if (role.getRoleNumber() == roleNumber) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid role number: " + roleNumber);
    }
}
