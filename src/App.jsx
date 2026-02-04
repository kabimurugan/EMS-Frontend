import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import AuthContext from "./context/AuthContext.jsx"
import PrivateRoute from "./utils/PrivateRoute.jsx"
import RoleBasedRoute from "./utils/RoleBasedRoute.jsx"
import AdminSummary from "./components/dashboard/AdminSummary.jsx"
import DepartmentList from "./components/departments/DepartmentList.jsx"
import AddDepartment from "./components/departments/AddDepartment.jsx"
import EditDepartment from "./components/departments/EditDepartment.jsx"
import AddEmployee from "./components/employees/AddEmployee.jsx"
import EmployeeList from "./components/employees/EmployeeList.jsx"
import EditEmployee from "./components/employees/EditEmployee.jsx"


function App() {

  return (
    <>
      <AuthContext>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to='/admin-dashboard/employees' />} />

            <Route path="/admin-dashboard" element={
              <RoleBasedRoute requiredRole={['admin']} >
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              </RoleBasedRoute>
            }>

            <Route index element={ <AdminSummary/> } ></Route>
            <Route path="/admin-dashboard/departments" element={ <DepartmentList/> } ></Route>
            <Route path="/admin-dashboard/add-department" element={ <AddDepartment/> } ></Route>
            <Route path="/admin-dashboard/department/:id" element={ <EditDepartment /> } ></Route>

            <Route path="/admin-dashboard/employees" element={ <EmployeeList/> } ></Route>
            <Route path="/admin-dashboard/add-employee" element={ <AddEmployee/> } ></Route>
            <Route path="/admin-dashboard/employee/:id" element={ <EditEmployee/> } ></Route>


            </Route>

            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          </Routes>
        </BrowserRouter>
      </AuthContext>
    </>
  )
}

export default App
