"use client";

import Card from "../render/components/Card";
import { useAuth } from "../auth/useAuth";

export default function UserNft() {
  const { nftList } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <h1 className="text-xl mb-3">보유한 배 NFT ({nftList.length}개)</h1>
      <Card />
    </div>
  );
}
