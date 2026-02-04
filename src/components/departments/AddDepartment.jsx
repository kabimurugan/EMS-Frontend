import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AddDepartment = () => {

  const [department, setDepartment] = useState(
    {
      dep_name: "",
      description: ""
    }
  )

  const navigate = useNavigate()
  // const [description, setDescription] = useState('')

  const handleFormDataChange = (key, value) => {
    setDepartment({ ...department, [key]: value })
  }


  const handleSubmitData = async (e) => {
    e.preventDefault()
    try {

      const token = localStorage.getItem("token")

      const response = await axios.post("https://ems-j292.onrender.com/api/department/add", department,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        navigate('/admin-dashboard/departments')
        alert("succesfully Inserted")
      }
    }
    catch (error) {
      alert(
        error.response?.data?.error || "Something went wrong"
      );
    }

  }

  return (
    <form className='flex justify-center items-center min-h-[70vh]' onSubmit={handleSubmitData}  >

      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-md">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Add Department
        </h1>

        {/* Form */}
        <div className="space-y-4">

          {/* Department Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department Name
            </label>
            <input
              type="text"
              placeholder="Department Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={(e) => handleFormDataChange("dep_name", e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Enter the description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleFormDataChange("description", e.target.value)}
              required
            ></textarea>
          </div>

          {/* Button */}
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md
                     hover:bg-blue-700 transition font-medium"
          >
            Add Department
          </button>

        </div>

        {/* Back Link */}
        <Link
          to="/admin-dashboard/departments"
          className="inline-block mt-4 text-sm text-blue-600 hover:underline"
        >
          ← Back to Departments
        </Link>

      </div>
    </form>
  )
}

export default AddDepartment
