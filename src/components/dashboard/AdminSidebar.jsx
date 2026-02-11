import React from "react";
import { NavLink } from "react-router-dom";
import { FaAddressCard } from "react-icons/fa";

const AdminSidebar = ({ closeSidebar }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
    ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
    }`;

  return (
    <div className="w-64 h-screen bg-white shadow-lg p-5 flex flex-col">
      
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600 mb-8">
        Project EMS
      </h1>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        
        <NavLink
          to="/admin-dashboard"
          className={linkClass}
          end
          onClick={closeSidebar}
        >
          <FaAddressCard className="text-lg" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className={linkClass}
          onClick={closeSidebar}
        >
          <FaAddressCard className="text-lg" />
          <span>Employees</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={linkClass}
          onClick={closeSidebar}
        >
          <FaAddressCard className="text-lg" />
          <span>Department</span>
        </NavLink>

      </nav>

      {/* Footer */}
      <div className="text-xs text-gray-400 mt-auto">
        © 2026 EMS
      </div>
    </div>
  );
};

export default AdminSidebar;
