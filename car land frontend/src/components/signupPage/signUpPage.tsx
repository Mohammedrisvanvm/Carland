import { LoginLeftSide } from "../authPage/LoginLeftBanner/LoginLeftSide"
import { SignUp } from "../authPage/signUp/SignUpForm"
import { MainHeader } from "../userHeader/MainHeader/MainHeader"


const SignUpPage = () => {
  return (
   <>
   <MainHeader/>
   <LoginLeftSide value={{ Auth:  <SignUp/>}}/>
   
   </>
  )
}

export default SignUpPage
