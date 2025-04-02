import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./useAppState";
import { api } from "../store/api";
import {
  setCredentials,
  logout,
  setError,
  setLoading,
} from "../store/slices/authSlice";
import { useRouter } from "next/router";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        dispatch(setLoading(true));
        const result = await dispatch(
          api.endpoints.login.initiate({ email, password })
        ).unwrap();
        dispatch(setCredentials(result));
        router.push("/dashboard");
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
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API call fails
      dispatch(logout());
      router.push("/login");
    }
  }, [dispatch, router]);

  const refreshToken = useCallback(async () => {
    if (!auth.refreshToken) return;

    try {
      const result = await dispatch(
        api.endpoints.refreshToken.initiate(auth.refreshToken)
      ).unwrap();
      dispatch(setCredentials({ ...auth, ...result }));
    } catch (error) {
      console.error("Token refresh error:", error);
      handleLogout();
    }
  }, [dispatch, auth, handleLogout]);

  const updateUser = useCallback(
    async (userData: Partial<typeof auth.user>) => {
      if (!auth.user) return;

      try {
        const result = await dispatch(
          api.endpoints.updateUser.initiate(userData)
        ).unwrap();
        dispatch(setCredentials({ ...auth, user: result }));
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

  const isAuthenticated = auth.isAuthenticated && !!auth.token;
  const isLoading = auth.isLoading;
  const error = auth.error;

  return {
    user: auth.user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: handleLogout,
    refreshToken,
    updateUser,
  };
};
