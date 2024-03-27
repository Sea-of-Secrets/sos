import { create } from "zustand";

interface GameDataState {
  type: string[];
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
  setPirateCurrentPosition: (newPosition: number) => void;
  setMarineOneCurrentPosition: (newPosition: number) => void;
  setMarineTwoCurrentPosition: (newPosition: number) => void;
  setMarineThreeCurrentPosition: (newPosition: number) => void;
}

export const useGameData = create<GameDataState>(set => ({
  type: [],
  treasures: {},
  pirateRoute: [],
  marineOneRoute: [],
  marineTwoRoute: [],
  marineThreeRoute: [],
  currentPosition: [0, 0, 0, 0],
  setType: newType => {
    set(state => {
      const updatedType = [...state.type, newType];
      return { ...state, type: updatedType };
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
  setPirateCurrentPosition: newPosition => {
    set(state => {
      const newCurrentPosition = [...state.currentPosition];
      newCurrentPosition[0] = newPosition;
      return { ...state, currentPosition: newCurrentPosition };
    });
  },
  setMarineOneCurrentPosition: newPosition => {
    set(state => {
      const newCurrentPosition = [...state.currentPosition];
      newCurrentPosition[1] = newPosition;
      return { ...state, currentPosition: newCurrentPosition };
    });
  },
  setMarineTwoCurrentPosition: newPosition => {
    set(state => {
      const newCurrentPosition = [...state.currentPosition];
      newCurrentPosition[2] = newPosition;
      return { ...state, currentPosition: newCurrentPosition };
    });
  },
  setMarineThreeCurrentPosition: newPosition => {
    set(state => {
      const newCurrentPosition = [...state.currentPosition];
      newCurrentPosition[3] = newPosition;
      return { ...state, currentPosition: newCurrentPosition };
    });
  },
}));
