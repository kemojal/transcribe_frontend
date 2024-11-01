"use client";
import { Button } from "@/components/ui/button";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();
  const handleLoginSuccess = async (response: any) => {
    const token = response.credential; // This is the OAuth2 token from Google

    console.log("token = ", token);

    try {
      // Send the token to your FastAPI backend
      const backendResponse = await axios.post(
        "http://localhost:8000/auth/auth/google",
        { token }
      );

      localStorage.setItem("token", backendResponse.data.access_token);
      router.push("/projects");

      // Here, you can handle successful login, e.g., save session or redirect
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLoginFailure = () => {
    console.log("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
}

