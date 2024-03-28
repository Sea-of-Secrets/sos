"use client";

import { useState, useEffect } from "react";
import {getUserInfo} from "../api/users";

export default function Index() {

  const [user, setUser] = useState<any>();

  const fetchData = async () => {
    try {
      const res = await getUserInfo();
      const data = res.data;
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
  <p>MyPage</p>
  <div>
        {user && (
          <div>
            <p>Username: {user.name}</p>
            <p>UserEmail: {user.email}</p>
            <p>wallet: {user.walletAddress}</p>
          </div>
        )}
      </div>
  </>
  );
}
