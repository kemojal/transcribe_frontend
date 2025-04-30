import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useAppState";
import { api } from "../store/api";
import {
  setCredentials,
  logout,
  setError,
  setLoading,
} from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import type { User } from "../store/types/index";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth) || {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        dispatch(setLoading(true));
        const result = await dispatch(
          api.endpoints.login.initiate({ email, password })
        ).unwrap();

        // Store tokens in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("refresh_token", result.refreshToken);

        // Update Redux state
        dispatch(setCredentials(result));

        // Redirect to projects page
        router.push("/projects");
      } catch (error) {
        dispatch(
          setError(error instanceof Error ? error.message : "Login failed")
        );
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, router]
  );

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(api.endpoints.logout.initiate()).unwrap();
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API call fails
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      router.push("/auth/login");
    }
  }, [dispatch, router]);

  const refreshToken = useCallback(async () => {
    if (!auth.refreshToken) return;

    try {
      const result = await dispatch(
        api.endpoints.refreshToken.initiate(auth.refreshToken)
      ).unwrap();
      if (auth.user) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("refresh_token", result.refreshToken);
        dispatch(setCredentials({ user: auth.user, ...result }));
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      handleLogout();
    }
  }, [dispatch, auth, handleLogout]);

  const updateUser = useCallback(
    async (userData: Partial<User>) => {
      if (!auth.user) return;

      try {
        const result = await dispatch(
          api.endpoints.updateUser.initiate(userData)
        ).unwrap();
        if (auth.token && auth.refreshToken) {
          dispatch(
            setCredentials({
              user: result,
              token: auth.token,
              refreshToken: auth.refreshToken,
            })
          );
        }
      } catch (error) {
        dispatch(
          setError(
            error instanceof Error ? error.message : "Failed to update user"
          )
        );
        throw error;
      }
    },
    [dispatch, auth]
  );

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    token: auth.token,
    refreshToken: auth.refreshToken,
    isLoading: auth.loading,
    error: auth.error,
    login,
    logout: handleLogout,
    refreshToken,
    updateUser,
  };
};
