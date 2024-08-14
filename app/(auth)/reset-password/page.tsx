"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fadeClass, setFadeClass] = useState("fade-in");

  const handleResetPassword = async () => {
    try {
      await axios.post(`${BASEURL}/users/reset-password`, { email });
      setSuccess("Password reset link has been sent to your email.");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to send reset link. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 ${fadeClass}`}
    >
      <section className="container flex flex-col items-center justify-center gap-8 px-4 py-6 md:py-12 max-w-lg">
        <div className="bg-white border border-gray-200 rounded-lg border border-gray-300 w-full p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Reset Password</h3>
            <p className="text-sm text-gray-500">
              Enter your email to receive a password reset link.
            </p>
          </div>

          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleResetPassword();
            }}
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <Button className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Send Reset Link
            </Button>
          </form>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
          {success && <p className="mt-4 text-sm text-green-500">{success}</p>}

          <div className="mt-6 flex justify-between text-sm">
            <Link
              aria-label="Back to login"
              className="text-indigo-600 hover:underline"
              href="/login"
            >
              Login
            </Link>
            <Link
              aria-label="Register"
              className="text-indigo-600 hover:underline"
              href="/register"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
