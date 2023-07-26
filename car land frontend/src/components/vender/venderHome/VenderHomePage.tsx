import React from 'react'
import VendorAside from '../venderASide/vendorAside'
import VendorDashboard from '../venderDashboard/venderDashboardpage'
import VendorNavBar from '../vendorNavbar/venderNavBar'

const VendorHomePage = () => {
  return (
    <>
    <VendorNavBar/>
    <VendorAside/>
    <VendorDashboard/>
    </>
  )
}

export default VendorHomePage
