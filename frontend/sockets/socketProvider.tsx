"use client";

import { useEffect } from "react";
import { gameSocket } from "~/sockets";

const { connect, disconnect } = gameSocket;

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const onConnect = () => {
      console.log("공용 소켓 연결 성공");
    };
    connect(onConnect);
    return () => {
      disconnect();
    };
  }, []);

  return <>{children}</>;
};

export default SocketProvider;
