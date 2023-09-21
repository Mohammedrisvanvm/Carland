
import { LoginLeftSide } from '../authPage/LoginLeftBanner/LoginLeftSide'
import { GoogleAuth } from '../authPage/googleAuth/googleAuth'
import { MainHeader } from '../userHeader/MainHeader/MainHeader'
const GoogleAuthPage = () => {
  return (
   <>
  <MainHeader/>
   <LoginLeftSide value={{Auth:<GoogleAuth/>}}/>
   </>
  )
}

export default GoogleAuthPage
