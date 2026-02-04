import React, { useContext, useEffect } from 'react'
import { userAuth } from '../context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummary from '../components/dashboard/AdminSummary'

const AdminDashboard = () => {
    const { user, loading } = useContext(userAuth)
    const navigate = useNavigate()

    // Redirect if not logged in
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login')
        }
    }, [user, loading, navigate])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-xl font-semibold text-gray-600">
                    Loading...
                </h1>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />

            <div className="flex flex-col flex-1">
                <Navbar />

                <main className=" p-4 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>

    )
}

export default AdminDashboard
