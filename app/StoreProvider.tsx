"use client";
// components/StoreProvider.tsx
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setAuthState } from "@/lib/reducers/authSlice";
import { useRouter } from "next/navigation";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(makeStore());
  // const dispatch = useAppDispatch();
  // const router = useRouter();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       // Replace with actual token validation logic
  //       const isValidToken = true;

  //       if (isValidToken) {
  //         dispatch(setAuthState(true));
  //         router.push("/projects");
  //       } else {
  //         dispatch(setAuthState(false));
  //         router.push("/login");
  //       }
  //     } else {
  //       dispatch(setAuthState(false));
  //       router.push("/login");
  //     }
  //   };

  //   checkAuth();
  // }, [dispatch, router]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
