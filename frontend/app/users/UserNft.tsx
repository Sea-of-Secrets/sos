"use client";

import * as UsersApi from "../api/users";
import { NFTModel } from "./types";
import { useEffect, useState } from "react";
import Card from "../render/components/Card";

export default function UserNft() {
  const [loading, setLoading] = useState(false);
  const [nftList, setNftList] = useState<NFTModel[]>([]);

  const fetchNftList = async () => {
    const response = await UsersApi.getWallet();
    setNftList(response.data);
    setLoading(true);
  };

  useEffect(() => {
    fetchNftList();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1>보유 게임 말 NFT ({nftList.length}개)</h1>
          <Card nfts={nftList} />
        </div>
      ) : (
        <span>NFT 정보를 로드중입니다...</span>
      )}
    </>
  );
}
