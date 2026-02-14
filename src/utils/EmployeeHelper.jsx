import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"

export const fetchDepartments = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('https://ems-j292.onrender.com/api/department', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (response.data.success) {
      return response.data.departments
    }
    // return []
  }
  catch (error) {
    console.log(
      error.response?.data?.error || "Something went wrong"
    );
    return []
  }
}



export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "80px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true
  },
  {
    name: "Department",
    selector: (row) => row.department,
  },
  {
  name: "Image",
  cell: (row) => (
    <img
      src={row.image}
      alt="emp"
      className="w-10 h-10 rounded-full object-cover"
    />
  )
}
,
  {
    name: "Action",
    selector: (row) => row.action
  }
];

export const EmployeeButtons = ({ _id, onEmployeeDelete }) => {

  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://ems-j292.onrender.com/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.data.success) {
        onEmployeeDelete(id)
      }
    }
    catch (error) {
      if (!error.response.data.success) {
        console.log(error)
      }
    }
  }

  return (
    <div className="flex gap-2 text-center" >
      <button className="py-1 px-3 bg-blue-600 text-white font-semibold rounded" onClick={() => navigate(`/admin-dashboard/employee/${_id}`)} >Edit</button>
      <button className="py-1 px-3 bg-red-600 text-white font-semibold rounded" onClick={() => handleDelete(_id)} >Delete</button>
    </div>
  )
}