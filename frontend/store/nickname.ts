import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NicknameState {
  nickname: string;
  setNickname: (value: string) => void;
}

const useNickname = create<NicknameState>()(
  persist(
    set => ({
      nickname: "",
      setNickname: (value: string) => set({ nickname: value }),
    }),
    {
      name: "nickname",
    },
  ),
);

export default useNickname;
