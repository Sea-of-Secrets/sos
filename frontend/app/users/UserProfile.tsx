"use client";

import { UserModel, WalletModel } from "./types";
import { getUserInfo2, makeWallet2 } from "../api/users";
import { useEffect, useState } from "react";
import Button from "../render/components/Button";

export default function UserProfile() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [copied, setCopied] = useState(false); // 복사 버튼 클릭 상태를 관리합니다.

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

  // 주소를 클립보드에 복사합니다.
  const handleCopyAddress = () => {
    if (user.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress);
      setCopied(true);
    }
  };

  // 주소를 마스킹하는 함수
  const maskAddress = (address: string) => {
    if (!address) return '';
    const visibleChars = 6; // 보여질 문자열 길이
    const maskedPart = '...'; // 마스킹할 부분
    return address.slice(0, visibleChars) + maskedPart;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection:'column' }}>
      <h2>{user.name}님 안녕하세요!</h2>
      {!user.walletAddress && (
        <Button onClick={handleMakeWallet}>지갑 만들기</Button>
      )}
      {user.walletAddress && <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '10px' }}>지갑 주소 : {maskAddress(user.walletAddress)}</p>
          <Button onClick={handleCopyAddress} size={"xs"}>{copied ? "복사됨" : "복사하기"}</Button>
        </div>}
    </div>
  );
}
