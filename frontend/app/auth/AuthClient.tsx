"use client";

import { PropsWithChildren, useEffect } from "react";
import * as UsersApi from "../api/users";
import { deleteAuthCookie } from "./cookie";
import { useAuth } from "./useAuth";

export function AuthClient({ children }: PropsWithChildren) {
  const { setUser } = useAuth();

  const fetchUser = async () => {
    try {
      const { data } = await UsersApi.getUserInfo();
      console.log(data);
      if (data.name) {
        setUser(data);
      } else {
        setUser(null);
        deleteAuthCookie();
      }
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
