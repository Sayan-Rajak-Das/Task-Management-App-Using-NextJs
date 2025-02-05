"use client";
import { useState, useEffect } from "react";
import Task from "@/components/Task";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // Ensure this runs only on client
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Now we know we're in the browser
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        router.push("/login"); // Redirect to login page if no token
      }
    }
  }, []);

  if (!isClient) {
    return null; // Prevent rendering on server to avoid errors
  }

  return token ? (
    <>
      <Navbar isAuthenticated={true} />
      <main>
        <Task token={token}  />
      </main>
    </>
  ) : null; // Prevents UI flicker before redirect
}
