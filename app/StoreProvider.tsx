"use client";
// components/StoreProvider.tsx
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store/store";
import { ReactNode, useEffect, useState } from "react";

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
