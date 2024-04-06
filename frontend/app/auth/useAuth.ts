import { create } from "zustand";
import { User, UserTypeKeys } from "./types";

interface AuthStoreState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (userData: any) => void;
}

export const useAuth = create<AuthStoreState>(set => ({
  user: null,
  isLoggedIn: false,
  setUser: userData => {
    set(state => {
      if (validateUser(userData)) {
        return { ...state, user: userData, isLoggedIn: true };
      }
      return { ...state, user: null, isLoggedIn: false };
    });
  },
}));

export const validateUser = (userData: any) => {
  return userData && UserTypeKeys.every(key => key in userData);
};
