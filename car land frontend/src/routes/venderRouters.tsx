import { Route, Routes } from 'react-router'
import CarList from '../components/vender/list/carList/carList'
import VendorHomePage from '../components/vender/venderHome/VendorHomePage'
import Dashboard from '../components/admin/adminDashboard/tesxt'
import VenderDashboardPage from '../components/vender/venderDashboard/vendorDashboardpage'
import CarManagementPage from '../components/vender/venderCarManagementPage/carManagementPage'
import AddCarPage from '../components/vender/venderCarManagementPage/addCar/addCarPage'
import { VendorOtp } from '../components/vender/venderAuth/vendorOtp/vendorOtp'
import VendorSignUp from '../components/vender/venderAuth/vendorSignup/venderSignup'
import VenderLogin from '../components/vender/venderAuth/vendorLogin/vendorLogin'

const VendorRouters = () => {
  return (
 <>
 <Routes>
    <Route path='/login' element={<VenderLogin/>}/>
    <Route path='/signup' element={<VendorSignUp/>}/>
    <Route path='/otp' element={<VendorOtp/>}/>
    <Route path='/vendorhome' element={<VendorHomePage/>}/>
    <Route path='/vendordashboard' element={<VenderDashboardPage/>}/>
    <Route path='/vendorcars' element={<CarManagementPage/>}/>
    <Route path='/vendorcar/addcar' element={<AddCarPage/>}/>
    <Route path='/vendordrivers' element={<CarList/>}/>
    <Route path='/vendorhubs' element={<Dashboard/>}/>
    <Route path='/vendorList' element={<CarList/>}/>
 </Routes>
 </>
  )
}

export default VendorRouters
