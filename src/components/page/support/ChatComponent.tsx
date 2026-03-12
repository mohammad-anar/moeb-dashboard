/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  addMessage,
  selectSelectedRoomId,
  selectSelectedRoomMessages,
  setRoomMessages,
} from "@/redux/features/messageSlice";
import {
  useGetChatMessagesQuery,
  useSendMessageMutation,
} from "@/redux/service/chat/chatApi";
import { RootState } from "@/redux/store";
import { Loader2, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const normalizeApiMessages = (apiData: any[]) =>
  apiData.map((m) => ({
    id: m._id,
    roomId: m.chatId,
    text: m.text,
    senderId: typeof m.sender === "object" ? m.sender._id : m.sender,
    senderName: typeof m.sender === "object" ? m.sender.name : "",
    senderAvatar: typeof m.sender === "object" ? m.sender.profilePicture : "",
    createdAt: m.createdAt,
  }));

const normalizeSendMessage = (data: any) => ({
  id: data._id,
  roomId: data.chatId,
  text: data.text,
  senderId: typeof data.sender === "object" ? data.sender._id : data.sender,
  createdAt: data.createdAt,
});

export default function ChatComponent() {
  const dispatch = useDispatch();
  const roomId = useSelector(selectSelectedRoomId);
  const messages = useSelector(selectSelectedRoomMessages);
  
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentUserId = currentUser?._id || currentUser?.id || currentUser?.userId;

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const { chatMessages } = useGetChatMessagesQuery(roomId ?? "", {
    skip: !roomId,
    selectFromResult: ({ data }) => ({
      chatMessages: data?.data ?? [],
    }),
  });

  // Sync messages from API
  useEffect(() => {
    if (!roomId || !chatMessages || chatMessages.length === 0) return;
    const normalized = normalizeApiMessages(chatMessages);


    // We only setRoomMessages on initial load if empty, or merge carefully
    dispatch(setRoomMessages({ roomId, messages: normalized }));
  }, [chatMessages, roomId, dispatch]); // Removed 'messages' from dependencies to prevent sync loops

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || !roomId) return;

    const optimistic = {
      id: crypto.randomUUID(),
      roomId,
      text: inputValue,
      senderId: currentUserId || "user", // Use real ID if available
      createdAt: new Date().toISOString(),
      queued: true,
    };

   
    setInputValue("");

    try {
      const res = await sendMessage({
        chatId: roomId,
        body: { text: optimistic.text },
      }).unwrap();
      
      const resData = res.data;
      const normalized = normalizeSendMessage(resData);
      
      // Then update with the real ID to match socket events later
      setTimeout(() => {
        dispatch(addMessage({ ...normalized }));
      }, 100);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="flex flex-col min-h-[60vh]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {messages?.length === 0 && (
          <div className="flex items-center min-h-[40vh] justify-center h-full">
            <p className="text-gray-400 text-center">Start a conversation</p>
          </div>
        )}

        {messages?.map((msg) => {
          // Robust isMe check: check against currentUserId and fallback "user"
          const isMe = currentUserId 
            ? msg.senderId === currentUserId || msg.senderId === "user"
            : msg.senderId === "user";

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isMe ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0`}
              >
                {isMe ? <button className="w-full h-full rounded-full bg-gray-500 text-white" >Me</button> : <button className="w-full h-full rounded-full bg-blue-500 text-white" >U</button>}
              </div>

              <div  
                className={`flex flex-col max-w-md ${
                  isMe ? "items-start" : "items-end"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    isMe
                      ? "bg-blue-100 text-gray-800 border border-blue-200"
                      : "bg-gray-100 text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {msg.queued && (
                    <span className="text-xs text-orange-500 font-semibold">
                      QUEUED
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isSending}
            className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
