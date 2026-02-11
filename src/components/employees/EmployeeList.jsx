import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Delete Handler
  const onEmployeeDelete = useCallback((id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    setFilteredData((prev) => prev.filter((emp) => emp.id !== id));
  }, []);

  // Search Handler
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    const result = employees.filter((emp) =>
      emp.name.toLowerCase().includes(value)
    );

    setFilteredData(result);
  };

  // Fetch Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://ems-j292.onrender.com/api/employees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;

          const data = response.data.fetchEmployee.map((emp) => ({
            id: emp._id,
            sno: sno++,
            name: emp.name,
            email: emp.email,
            image: emp.image,
            dob: emp.dob,
            department: emp.department?.dep_name,
            action: (
              <EmployeeButtons
                _id={emp._id}
                onEmployeeDelete={onEmployeeDelete}
              />
            ),
          }));

          setEmployees(data);
          setFilteredData(data);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [onEmployeeDelete]);

  return (
    <section className="p-4">
      <div className="bg-white p-4 rounded-xl shadow-md mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name"
            onChange={handleSearch}
            className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Add Button */}
          <Link
            to="/admin-dashboard/add-employee"
            className="text-center px-4 py-2 bg-blue-600 text-white
                       rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
          >
            + Add New Employee
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-500 mb-3 text-center">{error}</div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md p-2 overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          progressPending={loading}
        />
      </div>
    </section>
  );
};

export default EmployeeList;
