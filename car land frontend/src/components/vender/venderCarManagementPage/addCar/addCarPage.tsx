import React from 'react'
import VenderNavBar from '../../vendorNavbar/vendorNavBar'
import AddCar from './addCar'
import VendorAside from '../../venderASide/vendorAside'

const AddCarPage = () => {
  return (
    <>
    <VenderNavBar/>
    <VendorAside />
    <div className="sm:ml-64">
    <AddCar/></div>
    </>
  )
}

export default AddCarPage
