import { defineWebStorage } from "~/_lib/webStorage";

export const senderStorage = defineWebStorage<string>("wschat.sender");

export const gameStorage = defineWebStorage<string>("wschat.gameId");
