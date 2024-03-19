import { create } from "zustand";

interface NicknameState {
  nickname: string;
  setNickname: (v: string) => void;
}

const useNickname = create<NicknameState>(set => ({
  nickname: "",
  setNickname: value => set({ nickname: value }),
}));

export default useNickname;
