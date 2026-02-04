import React from 'react'
import { userAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'

const PrivateRoute = ( {children} ) => {

    const {user, loading} = useContext(userAuth)

    if(loading){
        return <div>Loading....</div>
    }

  return user? children : <Navigate to='/login' />
}

export default PrivateRoute