"use client";

import { getWalletInfo2 } from "../api/users";
import { NFTModel } from "./types";
import { useEffect, useState } from "react";

export default function UserNft() {
  const [nftList, setNftList] = useState<NFTModel[]>([]);

  const fetchNftList = async () => {
    const response = await getWalletInfo2();
    console.log(response);
  };

  useEffect(() => {
    fetchNftList();
  }, []);

  return (
    <>
      <h1>NFT List</h1>
      <ul>
        {nftList.map((nft, index) => (
          <li key={index}>
            <h2>{nft.name}</h2>
            <p>{nft.description || ""}</p>
            <img src={nft.image || ""} alt={nft.name} />
          </li>
        ))}
      </ul>
    </>
  );
}
