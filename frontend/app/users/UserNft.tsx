"use client";

import Card from "../render/components/Card";
import { useAuth } from "../auth/useAuth";

export default function UserNft() {
  const { nftList } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>보유 게임 기물 NFT ({nftList.length}개)</h1>
      <Card nfts={nftList} />
    </div>
  );
}
