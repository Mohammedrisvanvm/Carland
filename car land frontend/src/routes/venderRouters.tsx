import { Route, Routes } from 'react-router'
import { VendorLogin } from '../components/vender/venderAuth/venderLogin/vendorLogin'
import CarList from '../components/vender/list/carList/carList'
import VendorHomePage from '../components/vender/venderHome/VenderHomePage'
import Dashboard from '../components/admin/adminDashboard/tesxt'
import VenderDashboardPage from '../components/vender/venderDashboard/venderDashboardpage'
import CarManagementPage from '../components/vender/venderCarManagementPage/carManagementPage'
import AddCarPage from '../components/vender/venderCarManagementPage/addCar/addCarPage'

const VendorRouters = () => {
  return (
 <>
 <Routes>
    <Route path='/*' element={<VendorLogin/>}/>
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
