"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid credentials");
      }

      localStorage.setItem("token", data.token);
      toast.success("Login successfully");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
      {/* Logo or Branding (Optional) */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 mt-1">Sign in to your account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        {/* Login Button with Loader */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></span>
              <p className="text-white font-medium text-sm">Logging in...</p>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Divider Line */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-gray-500">or</span>
        </div>
      </div>

      {/* Register Link */}
      <p className="text-center text-gray-600 text-sm">
        Don't have an account?{" "}
        <button
          className="text-blue-600 font-medium hover:underline transition"
          onClick={() => router.push("/register")}
        >
          Register here
        </button>
      </p>
    </div>
  );
}
