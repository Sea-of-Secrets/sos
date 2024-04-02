"use client";

import { UserModel, WalletModel } from "./types";
import { getUserInfo2, logout, makeWallet2 } from "../api/users";
import { useEffect, useState } from "react";
import Button from "../render/components/Button";

import MiniModal from "../render/components/MiniModal";
import MiniModalContent from "../render/components/MiniModalContent";
import { useAuth } from "~/store/auth";

export default function UserProfile() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false); // 복사 버튼 클릭 상태를 관리합니다.
  const [walletLoading, setWalletLoading] = useState(false);
  const [wallet, setWallet] = useState<WalletModel | null>(null);

  const handleMakeWallet = async () => {
    try {
      const response = await makeWallet2();
      const { address, mnemonic, privateKey } = response.data as WalletModel;
      setWallet(response.data as WalletModel);
    } catch (e) {
      console.error(e);
    }
  };

  if (!user) {
    return <h1>유저가 없음... 로딩중일수도 있음...</h1>;
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
      <h2>{user.name}님 안녕하세요!</h2>
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
      <h2>현재 기본 말 : {user.productName}</h2>
      {/* {wallet && 
      <MiniModal>
        title
        <MiniModalContent>
            <p>{wallet.address}</p>
            <p>{wallet.mnemonic}</p>
            <p>{wallet.privateKey}</p>
        </MiniModalContent>
      </MiniModal>
        
      } */}
    </div>
  );
}
