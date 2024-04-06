"use client";

import { PropsWithChildren, useEffect } from "react";
import * as UsersApi from "../api/users";
import { deleteAuthCookie } from "./cookie";
import { useAuth, validateUser } from "./useAuth";

export function AuthClient({ children }: PropsWithChildren) {
  const { setUser } = useAuth();

  const fetchUser = async () => {
    try {
      const { data: userData } = await UsersApi.getUserInfo();
      if (validateUser(userData)) {
        setUser(userData);
        return;
      }
      setUser(null);
      deleteAuthCookie();
    } catch (e) {
      setUser(null);
      deleteAuthCookie();
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <>{children}</>;
}
