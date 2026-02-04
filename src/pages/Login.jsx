import { useState } from "react";
import axios from "axios";
import { userAuth } from "../context/AuthContext";
import { useContext } from "react";
import {useNavigate} from 'react-router-dom'

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  // UseContext to pass the user value 
  const { login } = useContext(userAuth)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://ems-j292.onrender.com/api/auth/login", { email, password })
      if (response.data.success) {

        // user ah authContext ku send panna
        login(response.data.user)

        //local storage la token save panrom
        localStorage.setItem("token", response.data.token)
        
        if(response.data.user.role === "admin"){
            navigate('/admin-dashboard')
        }
        else{
            navigate('/employee-dashboard')
        }
        console.log(response)
        // alert(`Admin loggedIn Successfully ${response.data.user.name}`)
        setError(null)
      }
    }
    catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        setError(error.response.data.error)  // show backend error
      }
      else {
        setError("Something went wrong in server") // other JS errors
      }
    }


  }

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>


      <section className="min-h-screen flex flex-col items-center justify-center bg-[#170D27]">
        <h1 className="text-4xl font-semibold text-white mb-8">Employee Management System</h1>
        <div className="flex flex-col justify-center w-full mx-auto max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
          <h2 className="text-2xl font-semibold text-center">Sign In</h2>
          <p className="text-slate-300 mt-1 text-center">Login to your account</p>
          <form onSubmit={handleSubmit} className="mt-8">
            <label htmlFor="email" className="block mb-1 font-medium text-slate-300">Email address</label>
            <input type="email" id="email" name="email" placeholder="Email" onChange={(e) => {setEmail(e.target.value); setError(null)}} required className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500" />

            <label htmlFor="password" className="block mb-1 font-medium text-slate-300">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value); setError(null)}} required className="w-full p-2 mb-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500" />
            <div className="flex justify-between">
              <p className="text-red-500" >{error}</p>
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
            <button type="submit" className="w-full mt-7 px-4 py-2.5 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Sign in</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login
