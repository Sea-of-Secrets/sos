import { create } from "zustand";
import { NFTType, User, UserTypeKeys } from "./types";

interface AuthStoreState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (userData: any) => void;
  nftList: NFTType[];
  setNftList: (nftListData: any) => void;
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
  nftList: [],
  setNftList: nftListData => {
    set(state => {
      if (validateNftListData(nftListData)) {
        return { ...state, nftList: nftListData };
      }
      return { ...state };
    });
  },
}));

export const validateUser = (userData: any) => {
  return userData && UserTypeKeys.some(key => key in userData);
};

export const validateNftListData = (nftListData: any) => {
  return Array.isArray(nftListData);
};
