import { create } from "zustand";
import { GatchaType } from "~/app/auth/types";

interface RandomGatchaStoreState {
  loading: boolean;
  randomGatcha: GatchaType | null;
  fetchRandomGatcha: () => void;
}

export const useRandomGatcha = create<RandomGatchaStoreState>((set, get) => ({
  loading: false,
  randomGatcha: null,
  fetchRandomGatcha: async () => {
    if (get().randomGatcha) {
      return;
    }
    set(state => ({ ...state, loading: true }));
    const randomGatcha = await mockGatcha();
    set(state => ({ ...state, randomGatcha, loading: false }));
  },
}));

const MOCK_DATA: GatchaType = {
  name: "고잉메리호",
  grade: "LEGENDARY",
  hasItemAlready: true,
  imgUrl: "/ship_images/고잉메리호.png",
};

const mockGatcha = async (): Promise<GatchaType> => {
  // console.log("두근두근 가챠 타임 (테스트용)");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(MOCK_DATA);
      // console.log(MOCK_DATA);
    }, 5000);
  });
};
