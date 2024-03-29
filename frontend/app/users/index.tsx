"use client";

import { useState, useEffect } from "react";
import {getUserInfo, getWalletInfo, makeWallet} from "../api/users";
import { waitFor } from "@testing-library/react";

export default function Index() {

  const [user, setUser] = useState<any>();
  const [wallet, setWallet] = useState<any>();
  const [nftList, setNftList] = useState<any>([]);

  const fetchData = async () => {
    try {
      const res = await getUserInfo();
      const data = res.data;
      console.log(data);
      setUser(data);

      const nfts = await getWalletInfo();
      console.log(nfts.data);
      setNftList(nfts.data);
      console.log(nftList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const makeWalletButton = async () => {
    const res = await makeWallet();
    console.log(res.data);
    setWallet(res.data);
  }

  return (
    <>
  <p>MyPage</p>
  <div>
        {user && (
          <div>
            <p>Username: {user.name}</p>
            <p>UserEmail: {user.email}</p>
            {
              !user.walletAddress && (
                <button onClick={makeWalletButton}>지갑 만들기</button>
              )
            }
            {
              user.walletAddress && (
                <p>wallet: {user.walletAddress}</p>
              )
            }
            {
              nftList && (
                <div>
                  <h1>NFT List</h1>
                  <ul>
                    {nftList.map((nft: any, index: number) => (
                      <li key={index}>
                        <h2>{nft.name}</h2>
                        <p>{nft.description}</p>
                        <img src={nft.image} alt={nft.name} />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
          </div>
        )}
      </div>
  </>
  );
}
