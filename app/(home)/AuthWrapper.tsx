"use client";
import AuthNavbar from "@/components/AuthNavbar";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import { BASEURL } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAuthState } from "@/lib/reducers/authSlice";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

// Define the token payload structure
interface TokenPayload {
  exp: number;
  // other payload fields...
}

const AuthWrapper = ({
  children,
  inter,
}: {
  children: React.ReactNode;
  inter: any;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const authState = useAppSelector((state) => state.auth.authState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (token) {
        try {
          const decodedToken: TokenPayload = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp > currentTime) {
            dispatch(setAuthState(true));
            router.push("/projects");
          } else {
            // Token has expired, try to refresh it
            const refreshResponse = await fetch(
              `${BASEURL}/users/refresh-token`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
              }
            );
            if (refreshResponse.ok) {
              const refreshData = await refreshResponse.json();
              localStorage.setItem("token", refreshData.access_token); // Update the token
              localStorage.setItem("refresh_token", refreshData.refresh_token); // Update the refresh token
              dispatch(setAuthState(true));
              router.push("/projects");
            } else {
              dispatch(setAuthState(false));
              router.push("/login");
            }
          }
        } catch (error) {
          console.error("Authentication check failed:", error);
          dispatch(setAuthState(false));
          //   router.push("/login");
        }
      } else {
        dispatch(setAuthState(false));
        router.push("/login");
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    checkAuth();
    setLoading(false);
  }, [dispatch, router]);

  if (loading) {
    return <Loader />;
  }

  if (!authState) return;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col overflow-hidden">
        <AuthNavbar />
        <div className="flex flex-1 mt-0">
          <Sidebar />
          <main className={`flex-1 p-6 ${inter.className}`}>{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default AuthWrapper;
