import React from 'react'
import { Route, Routes } from 'react-router'
import VenderDashboard from '../components/vender/venderDashboard/venderDashboard'
import { VenderLogin } from '../components/vender/venderAuth/venderLogin/venderLogin'
import CarList from '../components/vender/list/carList/carList'

const VenderRouters = () => {
  return (
 <>
 <Routes>
    <Route path='/venderhome' element={<VenderDashboard/>}/>
    <Route path='/venderLogin' element={<VenderLogin/>}/>
    {/* <Route path='/venderLogin' element={<VenderLogin/>}/> */}
    <Route path='/venderList' element={<CarList/>}/>
 </Routes>
 </>
  )
}

export default VenderRouters
