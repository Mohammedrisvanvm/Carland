import React from 'react'
import VenderNavBar from '../vendorNavbar/vendorNavBar'
import VendorAside from '../venderASide/vendorAside'
import CarList from './Carlist'


const CarManagementPage = () => {
  return (
  <>
  <VenderNavBar/>
  <VendorAside  value={{Component:<CarList/>}}/>
  
  </>
  )
}

export default CarManagementPage
