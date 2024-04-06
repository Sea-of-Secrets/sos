"use client";

import { PropsWithChildren, useEffect } from "react";
import * as UsersApi from "../api/users";
import { deleteAuthCookie } from "./cookie";
import { useAuth, validateNftListData, validateUser } from "./useAuth";

export function AuthClient({ children }: PropsWithChildren) {
  const { setUser, setNftList } = useAuth();

  const fetchUser = async () => {
    try {
      const { data: userData } = await UsersApi.getUserInfo();
      if (validateUser(userData)) {
        setUser(userData);
        return;
      }
      setUser(null);
      deleteAuthCookie();
    } catch (e) {
      setUser(null);
      deleteAuthCookie();
    }
  };

  const fetchNftList = async () => {
    try {
      const { data: nftListData } = await UsersApi.getWallet();
      if (validateNftListData(nftListData)) {
        setNftList(nftListData);
      }
      return;
    } catch (e) {
      console.error("fetch fail nftList");
    }
  };

  const fetchNFTUserData = async () => {
    await fetchUser();
    await fetchNftList();
  };

  useEffect(() => {
    fetchNFTUserData();
  }, []);

  return <>{children}</>;
}
