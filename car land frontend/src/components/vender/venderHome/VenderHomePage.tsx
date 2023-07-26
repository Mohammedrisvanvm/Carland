import React from 'react'
import VendorAside from '../venderASide/vendorAside'

import VendorNavBar from '../vendorNavbar/venderNavBar'
import VenderHubs from '../venderDashboard/VenderDashboard'

const VendorHomePage = () => {
  return (
    <>
    <VendorNavBar/>
    <VendorAside value={{Component: <VenderHubs/>}}/>
  
    </>
  )
}

export default VendorHomePage
