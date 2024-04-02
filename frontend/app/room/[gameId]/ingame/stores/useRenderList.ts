import { create } from "zustand";

interface RenderListState {
  renderList: string[];
  setRenderList: (newNickname: string) => void;
}

export const useRenderList = create<RenderListState>(set => ({
  renderList: ["렌더링 목록"],
  setRenderList: newNickname => {
    set(state => ({
      renderList: [...state.renderList, newNickname],
    }));
  },
}));
