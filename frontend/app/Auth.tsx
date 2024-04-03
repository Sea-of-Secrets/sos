"use client";

import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "~/store/auth";
import * as UsersApi from "./api/users";

export default function Auth({ children }: PropsWithChildren) {
  const { setUser } = useAuth();

  const fetchUser = async () => {
    try {
      const access = window.localStorage.getItem("access");
      const refresh = window.localStorage.getItem("refresh");
      if (access && refresh) {
        const { data } = await UsersApi.getUserInfo();
        setUser(data);
      }
    } catch (e) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <>{children}</>;
}
