"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleLoginButton from "../login/GoogleLogin";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [fadeClass, setFadeClass] = useState("fade-in");

  const handleRegister = async () => {
    try {
      await axios.post(`${BASEURL}/users/register`, {
        username,
        email,
        password,
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen  ${fadeClass}`}
    >
      <section className="gap-8 pb-8 pt-6 md:py-8 container flex h-[100dvh] w-full flex-col items-center justify-center max-w-lg overflow-hidden">
        <div className="bg-white text-gray-900 rounded-lg border border-gray-50 w-full p-8">
          <div className="flex flex-col p-6 space-y-4">
            <h3 className="font-bold text-3xl">Create Account</h3>
            <p className="text-gray-500 text-sm">
              Sign up to start your journey
            </p>
          </div>

          <div className="p-6 pt-0 grid gap-6">
            <GoogleLoginButton />
            {/* <button
              className="focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 border-input hover:bg-blue-500 hover:text-white border shadow-md px-4 py-3 bg-white h-12 w-full"
              aria-label="Sign in with Google"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="mr-3 h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                ></path>
              </svg>
              Continue with Google
            </button> */}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white text-gray-400 px-2">or</span>
              </div>
            </div>

            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="placeholder:text-gray-400 focus-visible:ring-blue-500 border-gray-300 h-10 w-full rounded-md border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="placeholder:text-gray-400 focus-visible:ring-blue-500 border-gray-300 h-10 w-full rounded-md border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="placeholder:text-gray-400 focus-visible:ring-blue-500 border-gray-300 h-10 w-full rounded-md border bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button className="cursor-pointer focus-visible:ring-offset-white focus-visible:ring-blue-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 shadow h-10 w-full">
                Register
              </Button>
            </form>
          </div>
          {error && (
            <p className="text-sm text-red-500 text-center mt-4">{error}</p>
          )}

          <div className="text-center text-xs text-gray-500 my-6">
            By clicking "Sign In with Google", or registering with an email, you
            agree to our{" "}
            <a
              href="/terms"
              className="text-blue-500 underline hover:text-blue-600"
              aria-label="Terms of Service"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-blue-500 underline hover:text-blue-600"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
            .
          </div>
          <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-2">
            <div className="text-gray-500 text-sm">
              Already have an account?{" "}
              <Link
                aria-label="Sign in"
                className="text-blue-500 underline-offset-4 transition-colors hover:underline"
                href="/login"
              >
                Login
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
      </section>
    </div>
  );
};

export default Register;
