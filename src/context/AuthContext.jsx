import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'

const userAuth = createContext()

const AuthContext = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // const navigate = useNavigate()

useEffect(() => {
    const verifyUser = async () => {
        try {
            const token = localStorage.getItem("token")

            if (!token) {
                setUser(null)
                return
            }

            const response = await axios.get(
                'https://ems-j292.onrender.com/api/auth/verify',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.data.success) {
                setUser(response.data.user)
            } else {
                setUser(null)
            }

        } catch (error) {
            console.log("error")
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    verifyUser()
}, [])


    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
    }

  return (
    <userAuth.Provider value={
        {
            login,
            user,
            logout,
            loading
        }
    }>
        { children }
    </userAuth.Provider>
  )
}

export {userAuth}
export default AuthContext