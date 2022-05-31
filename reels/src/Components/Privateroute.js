import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate } from 'react-router'
function Privateroute({children}) {
    const {User} = useContext(AuthContext);
    console.log(User);
  return (
    User ? children : <Navigate to="/login" />
  )
}

export default Privateroute