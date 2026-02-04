import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },

    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },

    {
        name: "Action",
        selector: (row) => row.action
    }
]

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const handleDelete = async (id) => {
        // e.preventDefault()
        const confirm = window.confirm('Are you sure?')
        if(confirm){
            try {
                const response = await axios.delete(`https://ems-j292.onrender.com/api/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.data.success) {
                    onDepartmentDelete(id)
                }
            }
            catch (error) {
                if (!error.response.data.success) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <div className="flex gap-2 text-center" >
            <button className="py-1 px-3 bg-blue-600 text-white font-semibold rounded" onClick={() => navigate(`/admin-dashboard/department/${_id}`)} >Edit</button>
            <button className="py-1 px-3 bg-red-600 text-white font-semibold rounded" onClick={()=>handleDelete(_id)} >Delete</button>
        </div>
    )
}