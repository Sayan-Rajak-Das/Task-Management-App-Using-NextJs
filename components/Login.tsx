"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner

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
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:opacity-50"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <div className="flex justify-center items-center space-x-2">
            <span className="w-6 h-6 border-2 border-blue-800 border-t-transparent border-solid rounded-full animate-spin shadow-md"></span>
            <p className="text-blue-800 font-medium text-base">Logging you in...</p>
          </div>          
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p className="text-center mt-4">
        Don't have an account?{" "}
        <button
          className="text-blue-500 underline"
          onClick={() => router.push("/register")}
        >
          Register here
        </button>
      </p>
    </div>
  );
}
