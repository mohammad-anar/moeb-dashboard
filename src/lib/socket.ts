import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
let socket: Socket | null = null;

export const getSocket = () => {
  const token = Cookies.get("accessToken");

  if (!socket) {
    socket = io("http://10.10.7.33:5002", {
      transports: ["websocket", "polling"],
      withCredentials: true,
      auth: {
        token: token,
      },
    });
  }

  return socket;
};
