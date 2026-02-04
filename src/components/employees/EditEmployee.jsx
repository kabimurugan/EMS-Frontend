import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        employee_id: "",
        dob: "",
        gender: "",
        marital_status: "",
        designation: "",
        department: "",
        salary: "",
        role: "",
        image: null,
        imagePreview: "",   // for OLD image display
    });

    // ✅ Fetch employee
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axios.get(
                    `https://ems-j292.onrender.com/api/employees/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const emp = res.data.getEmployee;

                setEmployee({
                    name: emp.name || "",
                    email: emp.email || "",
                    employee_id: emp.employee_id || "",
                    dob: emp.dob ? emp.dob.slice(0, 10) : "", // ✅ FIX
                    gender: emp.gender || "",
                    marital_status: emp.marital_status || "",
                    designation: emp.designation || "",
                    department: emp.department?._id || "",
                    salary: emp.salary || "",
                    role: emp.role || "",
                    image: null, // ❌ never prefill file
                    imagePreview: emp.image
                        ? `https://ems-j292.onrender.com/uploads/${emp.image}`
                        : "",
                });
            } catch (error) {
                console.error(error.response?.data || error.message);
            }
        };

        fetchEmployee();
    }, [id, token]);


    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        setEmployee((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(employee).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            await axios.put(
                `https://ems-j292.onrender.com/api/employees/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/admin-dashboard/employees");
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-6">Edit Employee</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Employee Name"
                    className="border p-2 rounded"
                />

                <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded"
                />

                <input
                    type="text"
                    name="employee_id"
                    value={employee.employee_id}
                    onChange={handleChange}
                    placeholder="Employee ID"
                    className="border p-2 rounded"
                />

                <input
                    type="date"
                    name="dob"
                    value={employee.dob}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <select
                    name="gender"
                    value={employee.gender}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <select
                    name="marital_status"
                    value={employee.marital_status}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Marital Status</option>
                    <option>Single</option>
                    <option>Married</option>
                </select>

                <input
                    type="text"
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    placeholder="Designation"
                    className="border p-2 rounded"
                />

                <input
                    type="number"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    className="border p-2 rounded"
                />

                <select
                    name="role"
                    value={employee.role}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    <option value="">Select Role</option>
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Employee</option>
                </select>

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="border p-2 rounded col-span-1 md:col-span-2"
                />


                {employee.imagePreview && (
                    <img
                        src={employee.imagePreview}
                        alt="Employee"
                        className="w-32 h-32 object-cover rounded border"
                    />
                )}


                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded col-span-1 md:col-span-2"
                >
                    Update Employee
                </button>
            </form>
        </div>
    );
};

export default EditEmployee;
