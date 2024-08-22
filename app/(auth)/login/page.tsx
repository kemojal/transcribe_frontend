"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleLoginButton from "./GoogleLogin";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [isLoading, setIsLoading] = useState(false);

  


  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(`${BASEURL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      router.push("/projects");
    } catch (error) {
      console.error(error);

      setError("Invalid email or password");
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${fadeClass}`}
    >
      <div className="absolute bg-purple-100 w-[603px] h-[464px] blur-[100px] dark:opacity-50 left-8 top-1/3"></div>
      <section className="container flex h-full w-full max-w-md flex-col items-center justify-center space-y-8 p-8  relative z-10">
        <div className="w-full p-8 rounded-lg bg-white border border-gray-200">
          <h3 className="text-3xl font-extrabold text-gray-800 tracking-tight text-center mb-4">
            Welcome Back
          </h3>
          <p className="text-gray-500 text-center mb-8">
            Sign in to your account
          </p>

          <div className="space-y-4 w-full  ">
            <GoogleLoginButton />

            <div className="relative text-center w-full">
              <span className="block bg-white px-4 text-gray-400 text-xs">
                OR
              </span>
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
              </div>
            </div>

            <form
              className="space-y-6 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border-gray-300 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border-gray-300 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={isLoading}
                  />
                  <Button
                    className="absolute right-1 flex items-center justify-center text-gray-500 hover:text-gray-700 h-8 w-8"
                    type="button"
                    variant={"ghost"}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </Button>
                </div>
              </div>

              <Button
                isLoading={isLoading}
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign In
              </Button>
            </form>

            {error && (
              <p className="text-sm text-red-500 text-center mt-4">{error}</p>
            )}

            <div className="text-center text-xs text-gray-500 my-6">
              By clicking "Sign In with Google", you agree to our{" "}
              <a
                href="/terms-of-service"
                className="text-blue-500 underline hover:text-blue-600"
                aria-label="Terms of Service"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="text-blue-500 underline hover:text-blue-600"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </a>
              .
            </div>

            <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-2">
              <div className="text-gray-500 text-sm">
                No account?{" "}
                <Link
                  aria-label="Sign in"
                  className="text-blue-500 underline-offset-4 transition-colors hover:underline"
                  href="/register"
                >
                  Register
                </Link>
              </div>
              <a
                aria-label="Reset password"
                className="text-blue-500 text-sm underline-offset-4 transition-colors hover:underline"
                href="/reset-password"
              >
                Reset password
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
