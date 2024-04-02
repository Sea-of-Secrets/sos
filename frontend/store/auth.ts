import { create } from "zustand";

export type User = {
  id: number;
  email: string;
  gold: number | null;
  name: string;
  productName: string | null;
  role: string;
  username: string;
  walletAddress: string | null;
};

interface AuthStoreState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (nextUser: User | null) => void;
}

export const useAuth = create<AuthStoreState>(set => ({
  user: null,
  isLoggedIn: false,
  setUser: nextUser => {
    set(state => {
      return { ...state, user: nextUser, isLoggedIn: !!nextUser };
    });
  },
}));

export const getAccessToken = () => {
  return window.localStorage.getItem("access");
};

export const getRefreshToken = () => {
  return window.localStorage.getItem("refresh");
};

export const removeToken = () => {
  window.localStorage.removeItem("access");
  window.localStorage.removeItem("refresh");
};
