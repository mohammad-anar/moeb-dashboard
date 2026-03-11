"use client";

import { ReactNode, useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setConnected } from "@/redux/features/socketSlice";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = getSocket();

    // CLIENT-SIDE EVENTS
    socket.on("connect", () => {
      console.log("✅ Socket connected", socket.id);
      dispatch(setConnected(true));
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
      dispatch(setConnected(false));
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [dispatch]);

  return <>{children}</>;
};
