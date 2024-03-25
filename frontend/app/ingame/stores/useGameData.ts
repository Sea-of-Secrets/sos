import { create } from "zustand";

interface GameDataState {
  type: string;
  treasures: { [key: number]: boolean };
  pirateRoute: number[];
  marineOneRoute: number[];
  marineTwoRoute: number[];
  marineThreeRoute: number[];
  currentPosition: number[];
  setType: (newType: string) => void;
  setTreasures: (newTreasures: { [key: number]: boolean }) => void;
  setPirateRoute: (newRoute: number[]) => void;
  setMarineOneRoute: (newRoute: number[]) => void;
  setMarineTwoRoute: (newRoute: number[]) => void;
  setMarineThreeRoute: (newRoute: number[]) => void;
  setCurrentPosition: (newPosition: number[]) => void;
}

export const useGameData = create<GameDataState>(set => ({
  type: "",
  treasures: {},
  pirateRoute: [],
  marineOneRoute: [],
  marineTwoRoute: [],
  marineThreeRoute: [],
  currentPosition: [],
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
  setCurrentPosition: newPosition => {
    set(state => {
      return { ...state, currentPosition: newPosition };
    });
  },
}));
