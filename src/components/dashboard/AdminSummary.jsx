import React from 'react'
import { FaUsers, FaBuilding, FaMoneyBill, FaCogs, FaFileAlt, FaCheckCircle, FaHourglass, FaHourglassHalf, FaCircle, FaTimesCircle } from 'react-icons/fa'
import SummaryCard from './SummaryCard.jsx'

const AdminSummary = () => {
    return (
        <>
            <section className='m-4'>
                <div>
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Dashboard Overview
                    </h1>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        <SummaryCard
                            icon={<FaUsers />}
                            text="Total Employees"
                            number={120}
                            color="bg-violet-600"
                        />

                        <SummaryCard
                            icon={<FaBuilding />}
                            text="Departments"
                            number={8}
                            color="bg-blue-600"
                        />

                        {/* <SummaryCard
                            icon={<FaMoneyBill />}
                            text="Monthly Salary"
                            number="₹2.5L"
                            color="bg-orange-600"
                        /> */}

                    </div>
                </div>

                {/* <div>
                    <h1 className='mt-14 mb-10 text-2xl font-bold text-center'>Leave Details</h1>

                    // Cards Grid

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        <SummaryCard
                            icon={<FaFileAlt />}
                            text="Leave Applied"
                            number={12}
                            color="bg-teal-600"
                        />
                        <SummaryCard
                            icon={<FaCheckCircle />}
                            text="Leave Approved"
                            number={7}
                            color="bg-green-600"
                        />
                        <SummaryCard
                            icon={<FaHourglassHalf />}
                            text="Leave Pending"
                            number={2}
                            color="bg-yellow-600"
                        />
                        <SummaryCard
                            icon={<FaTimesCircle />}
                            text="Leave Rejected"
                            number={3}
                            color="bg-red-600"
                        />
                    </div>

                </div> */}
            </section>
        </>
    )
}

export default AdminSummary
