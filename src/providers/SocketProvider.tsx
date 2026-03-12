/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setConnected } from "@/redux/features/socketSlice";
import { addMessage } from "@/redux/features/messageSlice";

// Normalize full message
const normalizeSocketMessage = (data: any) => {
  if (data.message) {
    const msg = data.message;
    return {
      id: msg._id,
      roomId: msg.chatId,
      text: msg.text,
      senderId: msg.sender._id,
      senderName: msg.sender.name,
      senderAvatar: msg.sender.profilePicture,
      createdAt: msg.createdAt,
    };
  }

  // Optional: handle preview messages if needed
  return null;
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = getSocket();

    socket.on("connect", () => {
      console.log("✅ Socket connected", socket.id);
      dispatch(setConnected(true));
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      dispatch(setConnected(false));
    });

    // SocketProvider.tsx
    socket.on("NEW_MESSAGE", (data) => {
      if (data.message) {
        // Full confirmed message
        const normalized = normalizeSocketMessage(data);
        if (normalized) dispatch(addMessage(normalized));
      } else if (data.preview) {
        // Preview message (typing or initial emit)
        dispatch(
          addMessage({
            id: data.messageId,
            roomId: data.chatId,
            text: data.preview,
            senderId: data.senderId || data.senderName, // Use senderId if available
            senderName: data.senderName,
            queued: true, // mark as preview
            createdAt: data.timestamp || new Date().toISOString(),
          }),
        );
      }
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("NEW_MESSAGE");
    };
  }, [dispatch]);

  return <>{children}</>;
};
