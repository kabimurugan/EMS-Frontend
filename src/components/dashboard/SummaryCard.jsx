import React from 'react'

const SummaryCard = ({ icon, text, number }) => {
  return (
    <div className=''>
      <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
        {/* Icon */}
        <div className={`p-4 bg-blue-600 rounded-full text-gray-100 text-xl`}>
          {icon}
        </div>

        {/* Text */}
        <div>
          <p className="text-sm text-gray-700 font-semibold">{text}</p>
          <p className="text-2xl font-bold text-gray-800">
            {number}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
