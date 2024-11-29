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
    <div className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center">
      {/* Dashboard Preview with Parallax Effect */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <div className="relative w-full max-w-5xl px-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative group mx-auto"
          >
            {/* Animated glow effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.2, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent rounded-3xl blur-2xl"
            />

            {/* Border glow */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 shadow-[inset_0_0_100px_rgba(255,255,255,0.05)]" />

            {/* Main image */}

            {/* Hover overlay */}
            <motion.div
              initial={false}
              animate={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-3xl backdrop-blur-sm"
            />
          </motion.div>

          {/* Additional decorative elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-[2rem] blur-2xl -z-10 opacity-50" />
          <div className="absolute -inset-8 bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-[2rem] blur-3xl -z-10" />
        </div>
      </motion.div>

      {/* Login Form Container */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
        className="container relative z-10 w-full max-w-md p-8"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="w-full p-8 bg-background/40 backdrop-blur-2xl rounded-3xl shadow-none border border-border/0 transition-all duration-300"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-2 text-center"
          >
            <h3 className="text-2xl font-bold  text-primary tracking-tight">
              Welcome Back
            </h3>
            <p className="text-muted-foreground text-sm">
              Sign in to your account to continue
            </p>
          </motion.div>

          <div className="mt-8 space-y-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className=" flex items-center justify-center"
            >
              <GoogleLoginButton />
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background/40 backdrop-blur-sm px-4 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-foreground/80">
                  Email
                </label>
                <div className="relative group">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full  rounded-xl focus:ring-2 focus:ring-primary/20 focus:rng-offset-2 transition-all duration-300 group-hover:bg-white/10"
                    placeholder="Enter your email"
                  />
                  <motion.div
                    initial={false}
                    animate={{ scale: email ? 0.98 : 1 }}
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-foreground/80">
                  Password
                </label>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full  rounded-xl focus:ring-2 focus:ring-primary/20 focus:rng-offset-2 transition-all duration-300 group-hover:bg-white/10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ scale: password ? 0.98 : 1 }}
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>
              </motion.div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-red-500 text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full  bg-primary/80 hover:bg-primary hover:ring-2 hover:ring-offset-2  text-primary-foreground rounded-xl py-6 font-medium transition-all duration-300 disabled:opacity-50 group relative overflow-hidden"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      y: isLoading ? "0%" : "100%",
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/10"
                  />
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <span className="relative z-10">Sign in</span>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center space-y-2"
            >
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
              <Link
                href="/reset-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
