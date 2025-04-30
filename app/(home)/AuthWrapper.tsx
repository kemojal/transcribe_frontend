"use client";
import AuthNavbar from "@/components/AuthNavbar";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";
import { BASEURL } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAuthState } from "@/lib/reducers/authSlice";
import { jwtDecode } from "jwt-decode";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useUI } from "@/lib/hooks/useUI";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  const { isAuthenticated, isLoading, refreshToken } = useAuth();
  const { addNotification } = useUI();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapsed = () => setIsCollapsed(!isCollapsed);

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
      if (!isAuthenticated) {
        try {
          await refreshToken();
          router.push(pathname || "/projects");
        } catch (error) {
          addNotification({
            id: Date.now().toString(),
            type: "error",
            message: "Session expired. Please log in again.",
            duration: 5000,
          });
          router.push("/login");
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, pathname, refreshToken, router, addNotification]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen flex flex-col overflow-hidden">
        <TooltipProvider>
          {/* <AuthNavbar /> */}
          <div className="flex flex-1 mt-0 ">
            <Sidebar
              isCollapsed={isCollapsed}
              toggleCollpased={toggleCollapsed}
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
