"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASEURL } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BASEURL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      router.push("/projects");
    } catch (error) {
      console.error(error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-[400px] p-8 space-y-6 bg-white rounded-lg  min-h-[512px]">
        <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <div>
          {/* <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label> */}
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          {/* <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label> */}
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <Button
            onClick={handleLogin}
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
