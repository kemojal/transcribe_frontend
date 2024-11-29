"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${BASEURL}/users/reset-password`, { email });
      setSuccess("Password reset link has been sent to your email.");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to send reset link. Please try again.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white flex items-center justify-center">
      {/* Form Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="container relative z-10 w-full max-w-md p-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="w-full p-8 transition-all duration-300"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-2"
          >
            <h3 className="text-2xl font-bold text-primary tracking-tight">
              Reset Password
            </h3>
            <p className="text-muted-foreground text-sm">
              Enter your email to receive a password reset link
            </p>
          </motion.div>

          <div className="mt-8 space-y-6">
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleResetPassword();
              }}
            >
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-foreground/90">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transition-all duration-300 group-hover:bg-white/10"
                />
                <motion.div
                  initial={false}
                  animate={{ scale: email ? 0.98 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 pointer-events-none"
                />
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary/80 hover:bg-primary hover:ring-2 hover:ring-offset-2 text-primary-foreground rounded-xl py-6 font-medium transition-all duration-300 disabled:opacity-50 group relative overflow-hidden"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      y: isLoading ? "0%" : "100%",
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/10"
                  />
                  <span className="relative">
                    {isLoading ? "Sending reset link..." : "Send Reset Link"}
                  </span>
                </Button>
              </motion.div>
            </motion.form>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-destructive text-center"
              >
                {error}
              </motion.p>
            )}

            {success && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-green-500 text-center"
              >
                {success}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center space-y-2"
            >
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
