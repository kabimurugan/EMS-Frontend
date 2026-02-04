import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchDep = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
    }
    fetchDep()
  }, [])

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post(
        "http://localhost:5000/api/employees/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Employee added successfully");
    } catch (error) {
      console.log("AXIOS ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);
      alert("Check console");
    }

  };


  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Add Employee</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Employee ID */}
        <input
          type="text"
          name="employee_id"
          placeholder="Employee ID"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* DOB */}
        <input
          type="date"
          name="dob"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Gender */}
        <select
          name="gender"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        {/* Marital Status */}
        <select
          name="marital_status"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Marital Status</option>
          <option>Single</option>
          <option>Married</option>
        </select>

        {/* Designation */}
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Department */}
        <select
          name="department"
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select</option>
          {departments.map((dep) => (
            <option key={dep._id} value={dep._id}>
              {dep.dep_name}
            </option>
          ))}
        </select>


        {/* Salary */}
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* Role */}
        <select
          name="role"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Role</option>
          <option>Admin</option>
          <option>Manager</option>
          <option>Employee</option>
        </select>

        {/* Image */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded col-span-1 md:col-span-2"
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded col-span-1 md:col-span-2 hover:bg-blue-700"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
