import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper.jsx'

const DepartmentList = () => {

  const [departments, setDepartments] = useState([])
  const [Search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [filterdData, setFilteredData] = useState([])

  const onDepartmentDelete = (id) => {
    // setDepartments(prev =>
    //   prev.filter(dep => dep.id !== id)
    // )
    setFilteredData(prev =>              // because we are sending filterdData in <Datatable>
      prev.filter(dep => dep.id !== id)
    )
  }

  const handleChange = (e) => {

    const search = e.target.value.toLowerCase()
    setSearch(search)

    const result = departments.filter( dep=> dep.dep_name.toLowerCase().includes(search) )
    setFilteredData(result)
  }


  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true)

      const token = localStorage.getItem("token")

      try {
        const response = await axios.get("https://ems-j292.onrender.com/api/department", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.data.success) {

          let sno = 1
          const data = response.data.departments.map((dep) => (
            {
              id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
            }
          ))
          setDepartments(data)
          setFilteredData(data) //initial data
        }
      } catch (error) {
        if (!error.response.data.success) {
          console.log(error)
        }
      }
      finally{
        setLoading(false)
      }
    }

    fetchDepartments()
  }, [])


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
            onChange={ handleChange }
          />

          {/* Add Button */}
          <Link
            to="/admin-dashboard/add-department"
            className="inline-block text-center px-4 py-2 bg-blue-600 text-white
                     rounded-md hover:bg-blue-700 transition"
          >
            + Add New Department
          </Link>

        </div>

      </div>

      <div>
        <DataTable columns={columns} data={filterdData} pagination progressPending={loading}/>
      </div>

    </section>
  )
}

export default DepartmentList
