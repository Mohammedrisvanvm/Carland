import React from 'react'
import { MainHeader } from '../userHeader/MainHeader/MainHeader'
import { Banner } from '../banner/Banner'
import { ServiceSelection } from '../serviceSelectionBoxes/serviceSelection'

const UserHomePage = () => {
  return (
    <>
    <MainHeader/>
    <Banner/>
    <ServiceSelection/>
    </>
  )
}

export default UserHomePage
