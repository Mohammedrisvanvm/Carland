import React from 'react'
import VenderNavBar from '../vendorNavbar/venderNavBar'
import VenderAside from '../venderASide/vendorAside'
import VenderDashboard from './venderDashboardpage'

const venderDashboardpage = () => {
  return (
    <>
    <VenderNavBar/>
    <VenderAside/>
    <VenderDashboard/>
    </>
  )
}

export default venderDashboardpage
