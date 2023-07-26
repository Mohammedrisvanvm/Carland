import React from 'react'
import { Route, Routes } from 'react-router'
import { VendorLogin } from '../components/vender/venderAuth/venderLogin/vendorLogin'
import CarList from '../components/vender/list/carList/carList'
import VendorHomePage from '../components/vender/venderHome/VenderHomePage'
import Dashboard from '../components/admin/adminDashboard/tesxt'
import VendorDashboardPage from '../components/vender/venderDashboard/venderDashboardpage'

const VendorRouters = () => {
  return (
 <>
 <Routes>
    <Route path='/vendorhome' element={<VendorHomePage/>}/>
    <Route path='/vendorLogin' element={<VendorLogin/>}/>
    <Route path='/vendordashboard' element={<VendorDashboardPage/>}/>
    <Route path='/vendorcars' element={<Dashboard/>}/>
    <Route path='/vendordrivers' element={<Dashboard/>}/>
    <Route path='/vendorDas' element={<Dashboard/>}/>
    <Route path='/vendorList' element={<CarList/>}/>
 </Routes>
 </>
  )
}

export default VendorRouters
