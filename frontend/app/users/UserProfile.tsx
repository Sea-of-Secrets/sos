"use client";

import { UserModel, WalletModel } from "./types";
import { getUserInfo2, makeWallet2 } from "../api/users";
import { useEffect, useState } from "react";
import Button from "~/_lib/components/Button";

export default function UserProfile() {
  const [user, setUser] = useState<UserModel | null>(null);

  const fetchUser = async () => {
    const response = await getUserInfo2();
    console.log(response);
    setUser(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleMakeWallet = async () => {
    try {
      const response = await makeWallet2();
      const { address, mnemonic, privateKey } = response.data as WalletModel;
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  if (!user) {
    return <h1>유저가 없음... 로딩중일수도 있음...</h1>;
  }

  return (
    <>
      <p>Username: {user.name}</p>
      <p>UserEmail: {user.email}</p>
      {!user.walletAddress && (
        <Button onClick={handleMakeWallet}>지갑 만들기</Button>
      )}
      {user.walletAddress && <p>wallet: {user.walletAddress}</p>}
    </>
  );
}
