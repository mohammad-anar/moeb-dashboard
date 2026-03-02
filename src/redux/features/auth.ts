/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSate {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthSate = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<{
        user: any;
      }>,
    ) {
      state.user = action.payload.user;
    },
    setAccessToken(state, action: { payload: string | null }) {
      state.accessToken = action.payload;
    },
    setRefreshToken(state, action: { payload: string | null }) {
      state.refreshToken = action.payload;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      window.location.href = "/login";
    },
  },
});

export const { setUser, setAccessToken, logout, setRefreshToken } =
  authSlice.actions;

export default authSlice.reducer;
