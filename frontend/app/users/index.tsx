"use client";

import { useState, useEffect } from "react";
import * as mypageAPI from "../api/users";

export default function Index() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        alert("hi");
        const res = await mypageAPI.getUserInfo();
        alert(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <p>mypage</p>;
}
