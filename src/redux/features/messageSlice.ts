import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export type Message = {
  id: string; // maps _id
  roomId: string; // maps chatId
  text: string;
  senderId: string | null; // maps sender
  senderName?: string;
  senderAvatar?: string;
  createdAt: string;
  queued?: boolean;
};

type MessagesState = {
  rooms: Record<string, Message[]>;
  selectedRoomId: string | null;
};

const initialState: MessagesState = {
  rooms: {},
  selectedRoomId: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;

      if (!state.rooms[message.roomId]) {
        state.rooms[message.roomId] = [];
      }

      // Find index of existing message (either by id or same text/timestamp for optimistic match)
      const existingIndex = state.rooms[message.roomId].findIndex(
        (m) => m.id === message.id
      );

      if (existingIndex !== -1) {
        // Update existing message (e.g., from queued to confirmed)
        state.rooms[message.roomId][existingIndex] = {
          ...state.rooms[message.roomId][existingIndex],
          ...message,
          queued: false, // Ensure it's marked as NOT queued when confirmed/updated from socket
        };
      } else {
        state.rooms[message.roomId].push(message);
      }
      
      // Keep sorted by date
      state.rooms[message.roomId].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    },

    setSelectedRoom: (state, action: PayloadAction<string>) => {
      state.selectedRoomId = action.payload;
    },

    setRoomMessages: (
      state,
      action: PayloadAction<{ roomId: string; messages: Message[] }>,
    ) => {
      const { roomId, messages } = action.payload;
      state.rooms[roomId] = messages.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    },

    clearRoomMessages: (state, action: PayloadAction<string>) => {
      delete state.rooms[action.payload];
    },
  },
});

export const {
  addMessage,
  setSelectedRoom,
  setRoomMessages,
  clearRoomMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;

// ===================== Selectors =====================
export const selectSelectedRoomId = (state: RootState) =>
  state.messages.selectedRoomId;

export const selectMessagesByRoomId = (roomId: string) => (state: RootState) =>
  state.messages.rooms[roomId] ?? [];

// Memoized selector
export const selectSelectedRoomMessages = createSelector(
  (state: RootState) => state.messages.rooms,
  (state: RootState) => state.messages.selectedRoomId,
  (rooms, selectedRoomId) => {
    if (!selectedRoomId) return [];
    return rooms[selectedRoomId] ?? [];
  },
);
