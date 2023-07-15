import React from 'react'
import { LoginLeftSide } from '../authPage/LoginLeftBanner/LoginLeftSide'
import { GoogleAuth } from '../authPage/googleAuth/googleAuth'
const GoogleAuthPage = () => {
  return (
   <>
   <LoginLeftSide value={{Auth:<GoogleAuth/>}}/>
   </>
  )
}

export default GoogleAuthPage
