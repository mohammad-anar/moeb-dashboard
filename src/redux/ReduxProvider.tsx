"use client";

import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "@/providers/SocketProvider";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketProvider>{children}</SocketProvider>
      </PersistGate>
    </Provider>
  );
}
