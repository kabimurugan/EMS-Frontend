import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaAddressCard } from 'react-icons/fa'

const AdminSidebar = () => {
    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
        ${isActive 
            ? 'bg-blue-600 text-white' 
            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
        }`

    return (
        <div className="w-64 min-h-screen bg-white shadow-lg p-5">
            {/* Logo / Title */}
            <h1 className="text-2xl font-bold text-blue-600 mb-8">
                Project EMS
            </h1>

            {/* Menu */}
            <nav className="space-y-2">
                <NavLink to="/admin-dashboard" className={linkClass} end>
                    <FaAddressCard className="text-lg" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/admin-dashboard/employees" className={linkClass} end>
                    <FaAddressCard className="text-lg" />
                    <span>Employees</span>
                </NavLink>

                <NavLink to="/admin-dashboard/departments" className={linkClass} end>
                    <FaAddressCard className="text-lg" />
                    <span>Department</span>
                </NavLink>

                {/* <NavLink to="/admin/salary" className={linkClass}>
                    <FaAddressCard className="text-lg" />
                    <span>Salary</span>
                </NavLink> */}

                {/* <NavLink to="/admin/settings" className={linkClass}>
                    <FaAddressCard className="text-lg" />
                    <span>Settings</span>
                </NavLink> */}
            </nav>
        </div>
    )
}

export default AdminSidebar
