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
import { usePathname } from "next/navigation";

import { QueryClient, QueryClientProvider } from "react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

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
  const queryClient = new QueryClient();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const authState = useAppSelector((state) => state.auth.authState);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollpased = () => setIsCollapsed(!isCollapsed);

  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      // console.log("currentUrl = ", currentUrl);
      localStorage.setItem("currentUrl", currentUrl);
      setFullUrl(currentUrl);
    }
  }, [router]);

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
            // console.log("Current pathname: ", pathname);
            router.push(pathname || "/projects");
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
              router.push(pathname || "/projects");
              // console.log("Current pathname: ", pathname);
              // return <p>Current pathname: {pathname}</p>;
            } else {
              dispatch(setAuthState(false));
              // get the current path

              router.push("/login");
              // router.push(`/login?redirect=${encodeURIComponent(fullUrl)}`);
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
        // router.push(`/login?redirect=${encodeURIComponent(fullUrl)}`);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    checkAuth();
    setLoading(false);
  }, [dispatch, router]);

  if (loading) {
    return;
    <div className="w-screen h-screen">
      <Loader />;
    </div>;
  }

  if (!authState) return;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col overflow-hidden">
        <TooltipProvider>
          {/* <AuthNavbar /> */}
          <div className="flex flex-1 mt-0 ">
            <Sidebar
              isCollapsed={isCollapsed}
              toggleCollpased={toggleCollpased}
            />
            <main
              className={`flex px-12 py-8  ${inter.className} 
          ${isCollapsed ? "w-[calc(100vw-80px)]" : "w-[calc(100vw-256px)]"}`}
            >
              {children}
            </main>
          </div>
        </TooltipProvider>
      </div>
    </QueryClientProvider>
  );
};

export default AuthWrapper;
