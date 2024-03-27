import type { ReactNode } from "react";
import SocketProvider from "~/sockets/socketProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SocketProvider>{children}</SocketProvider>
    </>
  );
}
