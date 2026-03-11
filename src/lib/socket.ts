import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://10.10.7.33:5002", {
      transports: ["websocket", "polling"], // fallback to polling if websocket fails
      withCredentials: true,
    });
  }

  return socket;
};
