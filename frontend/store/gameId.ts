import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameIdState {
  gameId: string;
  setGameId: (value: string) => void;
}

const useGameId = create<GameIdState>()(
  persist(
    set => ({
      gameId: "",
      setGameId: (value: string) => set({ gameId: value }),
    }),
    {
      name: "gameId",
    },
  ),
);

export default useGameId;
