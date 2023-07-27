import React from 'react'
import VenderNavBar from '../../vendorNavbar/venderNavBar'
import AddCar from './addCar'
import VendorAside from '../../venderASide/vendorAside'

const AddCarPage = () => {
  return (
    <>
    <VenderNavBar/>
    <VendorAside value={{Component:<AddCar/>}} />
    </>
  )
}

export default AddCarPage
