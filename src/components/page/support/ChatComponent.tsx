"use client";

import React from "react";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: string;
  queued?: boolean;
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: getTimestamp(),
      queued: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate processing message
    setTimeout(() => {
      // Update message as processed
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMessage.id ? { ...msg, queued: false } : msg,
        ),
      );

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis tincidunt odio. Nulla nulla sed purus. Nulla semper adipiscing.",
        sender: "assistant",
        timestamp: getTimestamp(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-[60vh]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex items-center min-h-[40vh] justify-center h-full">
            <p className="text-gray-400 text-center">Start a conversation</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                message.sender === "user"
                  ? "bg-red-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {message.sender === "user" ? "🔴" : "😊"}
            </div>

            {/* Message Content */}
            <div
              className={`flex flex-col max-w-md ${message.sender === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-blue-100 text-gray-800 border border-blue-200"
                    : "bg-gray-100 text-gray-800 border border-gray-200"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>

              {/* Timestamp and Status */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">
                  {message.timestamp}
                </span>
                {message.queued && (
                  <span className="text-xs text-orange-500 font-semibold">
                    QUEUED
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white flex-shrink-0">
              😊
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
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
            disabled={!inputValue.trim() || isLoading}
            className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
