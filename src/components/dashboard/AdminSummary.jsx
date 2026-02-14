import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaBuilding } from "react-icons/fa";
import SummaryCard from "./SummaryCard";

const AdminSummary = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch employees
        const empRes = await axios.get(
          "https://ems-j292.onrender.com/api/employees",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (empRes.data.success) {
          setTotalEmployees(empRes.data.fetchEmployee.length);
        }

        // Fetch departments
        const depRes = await axios.get(
          "https://ems-j292.onrender.com/api/department",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (depRes.data.success) {
          setTotalDepartments(depRes.data.departments.length);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      <SummaryCard
        icon={<FaUsers />}
        text="Total Employees"
        number={totalEmployees}
        color="bg-violet-600"
      />

      <SummaryCard
        icon={<FaBuilding />}
        text="Departments"
        number={totalDepartments}
        color="bg-blue-600"
      />
    </div>
  );
};

export default AdminSummary;
