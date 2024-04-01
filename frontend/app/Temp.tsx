"use client";

import { useEffect } from "react";

type Token =
  | {
      name: string;
      value: string;
    }
  | undefined;

export default function Temp({ token }: { token: Token }) {
  useEffect(() => {
    if (token) {
      window.localStorage.setItem(token.name, token.value);
    }
  }, [token]);

  return null;
}
