import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'

const EmployeeList = () => {

  const [employees, setEmployees] = useState([])
  const [filteredData, setFilteredData] = useState([])


  const onEmployeeDelete = (id)=> {
    setFilteredData( prev => prev.filter( emp => emp.id !== id ) )
  }

  // const handleChange = (e) => {

  //   const search = e.target.value.toLowerCase()
  //   setSearch(search)

  //   const result = departments.filter( dep=> dep.dep_name.toLowerCase().includes(search) )
  //   setFilteredData(result)
  // }


  useEffect(() => {

    const fetchDepartments = async () => {

      const token = localStorage.getItem("token")
      try {
        const response = await axios.get("http://localhost:5000/api/employees", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.data.success) {

          let sno = 1
          const data = response.data.fetchEmployee.map((emp) => (
            {
              id: emp._id,
              sno: sno++,
              name: emp.name,
              email: emp.email,
              image: emp.image,
              dob: emp.dob,
              department: emp.department.dep_name,
              action: (<EmployeeButtons _id={ emp._id } onEmployeeDelete = {onEmployeeDelete} />)
            }
          ))
          setEmployees(data)
          setFilteredData(data) //initial data
        }
      } catch (error) {
        if (!error.response.data.success) {
          console.log(error)
        }
      }

    }
    fetchDepartments()
  }, [])

  //   debugger;

  // }


  return (
    <section>
      <div className="bg-white p-4 shadow-md">

        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name"
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          // onChange={handleChange}
          />

          {/* Add Button */}
          <Link
            to="/admin-dashboard/add-employee"
            className="inline-block text-center px-4 py-2 bg-blue-600 text-white
                     rounded-md hover:bg-blue-700 transition"
          >
            + Add New Department
          </Link>

        </div>

      </div>

      <div>
        <DataTable columns={columns} data={filteredData} pagination highlightOnHover />
      </div>

    </section>
  )
}

export default EmployeeList