"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleLoginButton from "./GoogleLogin";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(`${BASEURL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      let currentUrl = localStorage.getItem("currentUrl");
      console.log("currentUrl = ", currentUrl);
      if (currentUrl) {
        router.push(currentUrl);
      } else {
        router.push("/projects");
      }
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 ">
      <motion.div
        className="absolute w-full flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src="/dashboard.png"
          width={900}
          height={464}
          alt="Dashboard preview"
          className="blur-sm rounded-3xl border border-gray-200 mt-20 opacity-80 transition-opacity duration-700 ease-in-out"
        />
      </motion.div>
      <div className="absolute bg-purple-200 dark:bg-purple-900 w-[603px] h-[464px] blur-[100px] dark:opacity-30 left-8 top-1/3"></div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="container relative z-10 w-full max-w-md p-8"
      >
        <div className="w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Sign in to your account
          </p>

          <div className="space-y-6">
            <GoogleLoginButton />

            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
              </div>
              <div className="relative">
                <span className="px-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">
                  OR
                </span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 transition-all duration-200"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 transition-all duration-200"
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
            <AnimatePresence>
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400 text-center mt-4 animate-fade-in">
                  {error}
                </p>
              )}
            </AnimatePresence>

            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
              By signing in, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                No account?{" "}
                <Link
                  href="/register"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Register
                </Link>
              </p>
              <Link
                href="/reset-password"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
