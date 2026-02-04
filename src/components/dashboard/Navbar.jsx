import React, { useContext } from 'react'
import { userAuth } from '../../context/AuthContext'

const Navbar = () => {
    const { user } = useContext(userAuth)

    return (
        <div className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6">
            {/* Welcome Text */}
            <h1 className="text-lg font-semibold text-gray-700">
                Welcome <span className="text-blue-600">
                    {user?.name || 'User'}
                </span>
            </h1>   

            {/* Logout */}
            <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                Logout
            </button>
        </div>
    )
}

export default Navbar
