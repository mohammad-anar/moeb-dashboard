/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setAccessToken, logout } from "../features/auth";
import Cookies from "js-cookie";

// 🔹 Base query WITH access token
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

// 🔹 Base query WITHOUT any auto headers
const baseQueryRaw = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api/v1",
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1️⃣ Try normal request
  let result = await baseQueryWithAuth(args, api, extraOptions);

  // 2️⃣ If access token expired
  if (result.error?.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      window.location.href = "/auth/login";
      return result;
    }

    console.log("Calling refresh with refreshToken");

    // 3️⃣ Call refresh endpoint manually with refresh token
    const refreshResult = await baseQueryRaw(
      {
        url: "/refresh-token",
        method: "GET",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
      api,
      extraOptions,
    );

    // 4️⃣ If refresh also failed → logout
    if (refreshResult.error?.status === 401) {
      api.dispatch(logout());
      Cookies.remove("accessToken");
      window.location.href = "/auth/login";
      return result;
    }

    const newAccessToken = (refreshResult.data as any)?.data?.accessToken;

    if (newAccessToken) {
      api.dispatch(setAccessToken(newAccessToken));

      // 5️⃣ Retry original request
      result = await baseQueryWithAuth(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      Cookies.remove("accessToken");
      window.location.href = "/auth/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Coupon", "Support", "Video"],
  endpoints: () => ({}),
});
