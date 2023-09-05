import React from 'react'
import VendorAside from '../venderASide/vendorAside'

import VendorNavBar from '../vendorNavbar/vendorNavBar'
import VenderHubs from '../venderDashboard/vendorDashboard'

const VendorHomePage = () => {
  return (
    <>
    <VendorNavBar/>
    <VendorAside value={{Component: <VenderHubs/>}}/>
  
    </>
  )
}

export default VendorHomePage
