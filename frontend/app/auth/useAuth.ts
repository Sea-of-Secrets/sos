import { create } from "zustand";
import { User } from "./types";

interface AuthStoreState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (nextUser: any) => void;
}

export const useAuth = create<AuthStoreState>(set => ({
  user: null,
  isLoggedIn: false,
  setUser: nextUser => {
    set(state => {
      if (validateUser(nextUser)) {
        return { ...state, user: nextUser, isLoggedIn: true };
      }
      return { ...state, user: null, isLoggedIn: false };
    });
  },
}));

const validateUser = (user: any) => {
  return !!user && user.username;

  // id: number;
  // name: string;
  // email: string;
  // role: string;
  // username: string;
  // walletAddress: string | null;
  // gold: number | null;
  // productName: number | string | null;
};
