import React from 'react'
import { useContext } from 'react'
import { userAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const RoleBasedRoute = ({ children, requiredRole }) => {

    const {user, loading} = useContext(userAuth)

    if(loading){
        return <div>Loading...</div>
    }

    // if(!requiredRole.includes(user.role)){
    //     <Navigate to='/unauthorized' />
    // }

  return user? children : <Navigate to='/login' />
}

export default RoleBasedRoute