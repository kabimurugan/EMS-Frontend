import React, { useContext, useEffect, useState } from "react";
import { userAuth } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";

const AdminDashboard = () => {
  const { user, loading } = useContext(userAuth);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold text-gray-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* Overlay (Mobile Only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 h-full transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <AdminSidebar closeSidebar={() => setIsOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full">
        
        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
