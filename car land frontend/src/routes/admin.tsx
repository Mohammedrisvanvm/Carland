import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from '../components/admin/adminDashboard/Dashboard'

const AdminRouters = () => {
  return (
    <Routes>
        <Route path='/adminhome' element={<Dashboard/>}/>
            
       
    </Routes>
  )
}

export default AdminRouters
