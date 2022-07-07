import React, {useContext} from 'react'
import { Navigate, Outlet} from "react-router-dom"
import AuthContext from '../Context/AuthContext';

const StaffPrivateRoute = () => {
    const {user} = useContext(AuthContext) 
    // console.log(user)
    return user.isStaff ? <Outlet /> : <Navigate to="/all" />;
}

export default StaffPrivateRoute