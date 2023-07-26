import React from 'react'
import VenderNavBar from '../vendorNavbar/venderNavBar'
import VendorAside from '../venderASide/vendorAside'
import CarList from '../list/carList/carList'

const CarManagementPage = () => {
  return (
  <>
  <VenderNavBar/>
  <VendorAside  value={{Component:<CarList/>}}/>
  
  </>
  )
}

export default CarManagementPage
