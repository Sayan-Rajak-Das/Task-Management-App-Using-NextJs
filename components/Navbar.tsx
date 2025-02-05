"use client";
import React from "react";

const Navbar = ({isAuthenticated}: any) =>  {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    window.location.reload(); 
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
