import React from 'react'
import { Route, Routes } from 'react-router'
import VenderDashboard from '../components/vender/venderDashboard/venderDashboard'

const VenderRouters = () => {
  return (
 <>
 <Routes>
    <Route path='/venderhome' element={<VenderDashboard/>}/>
 </Routes>
 </>
  )
}

export default VenderRouters
