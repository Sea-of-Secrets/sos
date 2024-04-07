"use client";

import * as UsersApi from "../api/users";
import { useState } from "react";
import Button from "../render/components/Button";

import { useAuth } from "~/app/auth/useAuth";
import { WalletType } from "../auth/types";

export default function UserProfile() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false); // 복사 버튼 클릭 상태를 관리합니다.
  const [wallet, setWallet] = useState<WalletType | null>(null);

  const handleMakeWallet = async () => {
    try {
      const response = await UsersApi.makeWallet();
      const { address, mnemonic, privateKey } = response.data as WalletType;
      setWallet(response.data as WalletType);
    } catch (e) {
      console.error(e);
    }
  };

  if (!user) {
    return <h1>로딩중...</h1>;
  }

  // 주소를 클립보드에 복사합니다.
  const handleCopyAddress = () => {
    if (user.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress);
      setCopied(true);
    }
  };

  // 주소를 마스킹하는 함수
  const maskAddress = (address: string) => {
    if (!address) return "";
    const visibleChars = 6; // 보여질 문자열 길이
    const maskedPart = "..."; // 마스킹할 부분
    return address.slice(0, visibleChars) + maskedPart;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!user.walletAddress && (
        <Button onClick={handleMakeWallet} size={"sm"}>
          지갑 만들기
        </Button>
      )}
      {user.walletAddress && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: "10px" }}>
            지갑 주소 : {maskAddress(user.walletAddress)}
          </p>
          <Button onClick={handleCopyAddress} size={"xs"}>
            {copied ? "복사됨" : "복사하기"}
          </Button>
        </div>
      )}
    </div>
  );
}
