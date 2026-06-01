/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

interface AuthSate {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthSate = {
  user: null,
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
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
      state.refreshToken = null;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.href = "/auth/login";
    },
  },
});

export const { setUser, setAccessToken, logout, setRefreshToken } =
  authSlice.actions;

export default authSlice.reducer;
