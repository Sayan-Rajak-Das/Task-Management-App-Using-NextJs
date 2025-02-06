"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Navbar = ({isAuthenticated}: any) =>  { 
  const router = useRouter();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    toast.success("Logout successfully");
    router.push("/login"); 
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div className="text-lg font-semibold">
        {isAuthenticated ? "Authenticated" : "Not Authorized"}
      </div>
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
