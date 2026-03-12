// store.ts
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth";
import messagesReducer from "./features/messageSlice";

// Persist config for auth slice
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken", "refreshToken"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Root reducer
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    messages: messagesReducer, // <-- add messages slice
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware,
    ),
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
