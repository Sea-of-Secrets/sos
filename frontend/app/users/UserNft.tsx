"use client";

import { getWallet, getWalletInfo2 } from "../api/users";
import { NFTModel } from "./types";
import { useEffect, useState } from "react";
import Card from "../render/components/Card";

export default function UserNft() {
  const [loading, setLoading] = useState(false);
  const [nftList, setNftList] = useState<NFTModel[]>([]);

  const fetchNftList = async () => {
    const response = await getWallet();
    setNftList(response.data);
    setLoading(true);
  };

  useEffect(() => {
    fetchNftList();
  }, []);

  

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection:'column' }}>
      <h1>보유 게임 기물 NFT</h1>
      {loading && <Card nfts={nftList}/>}
    </div>
  );
}
