"use client";

import { useEffect } from "react";

type Token =
  | {
      name: string;
      value: string;
    }
  | undefined;

export default function TokenSetter({
  access,
  refresh,
}: {
  access: Token;
  refresh: Token;
}) {
  useEffect(() => {
    setToken(access);
    setToken(refresh);
  }, [access, refresh]);

  return null;
}

const setToken = (token: Token) => {
  if (token) {
    window.localStorage.setItem(token.name, token.value);
  }
};
