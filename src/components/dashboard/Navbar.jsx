import React, { useContext } from "react";
import { userAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useContext(userAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (logout) logout();       // if logout function exists
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      
      {/* Left Section */}
      <div className="flex items-center gap-4">
        
        {/* Hamburger (Mobile Only) */}
        <button
          className="md:hidden text-gray-700 text-xl"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        {/* Welcome Text */}
        <h1 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
          Welcome{" "}
          <span className="text-blue-600">
            {user?.name || "User"}
          </span>
        </h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white 
                   bg-red-500 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
