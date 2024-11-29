"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GoogleLoginButton from "../login/GoogleLogin";
import { motion } from "framer-motion";
import Image from "next/image";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${BASEURL}/users/register`, {
        username,
        email,
        password,
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background flex items-center justify-center">
      

      {/* Register Form Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="container relative z-10 w-full max-w-md p-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="w-full p-8  transition-all duration-300"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-2"
          >
            <h3 className="text-2xl font-bold text-primary tracking-tight">
              Create Account
            </h3>
            <p className="text-muted-foreground text-sm">
              Sign up to start your journey
            </p>
          </motion.div>

          <div className="mt-8 space-y-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <GoogleLoginButton />
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background/40 backdrop-blur-md text-muted-foreground px-2">or continue with</span>
              </div>
            </div>

            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">
                  Username
                </label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                   className="w-full  rounded-xl focus:ring-2 focus:ring-primary/20 focus:rng-offset-2 transition-all duration-300 group-hover:bg-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                   className="w-full  rounded-xl focus:ring-2 focus:ring-primary/20 focus:rng-offset-2 transition-all duration-300 group-hover:bg-white/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full  rounded-xl focus:ring-2 focus:ring-primary/20 focus:rng-offset-2 transition-all duration-300 group-hover:bg-white/10"
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
                    {isLoading ? "Creating account..." : "Create Account"}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-center text-xs text-muted-foreground"
            >
              By clicking continue, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center space-y-2"
            >
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
              <Link
                href="/reset-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
