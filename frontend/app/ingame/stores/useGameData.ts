import { create } from "zustand";

interface GameDataState {
  type: string;
  setType: (newType: string) => void;
  treasures: { [key: number]: boolean };
  setTreasures: (newTreasures: { [key: number]: boolean }) => void;
  pirateRoute: number[];
  setPirateRoute: (newRoute: number[]) => void;
  marineOneRoute: number[];
  setMarineOneRoute: (newRoute: number[]) => void;
  marineTwoRoute: number[];
  setMarineTwoRoute: (newRoute: number[]) => void;
  marineThreeRoute: number[];
  setMarineThreeRoute: (newRoute: number[]) => void;
}

export const useGameData = create<GameDataState>(set => ({
  type: "",
  treasures: {},
  pirateRoute: [],
  marineOneRoute: [],
  marineTwoRoute: [],
  marineThreeRoute: [],
  setType: newType => {
    set(state => {
      return { ...state, type: newType };
    });
  },
  setTreasures: newTreasures => {
    set(state => {
      return { ...state, treasures: newTreasures };
    });
  },
  setPirateRoute: newRoute => {
    set(state => {
      return { ...state, pirateRoute: newRoute };
    });
  },
  setMarineOneRoute: newRoute => {
    set(state => {
      return { ...state, marineOneRoute: newRoute };
    });
  },
  setMarineTwoRoute: newRoute => {
    set(state => {
      return { ...state, marineTwoRoute: newRoute };
    });
  },
  setMarineThreeRoute: newRoute => {
    set(state => {
      return { ...state, marineThreeRoute: newRoute };
    });
  },
}));
