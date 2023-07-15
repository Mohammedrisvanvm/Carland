import { LoginLeftSide } from "../authPage/LoginLeftBanner/LoginLeftSide"
import { SignUp } from "../authPage/signUp/SignUpForm"


const SignUpPage = () => {
  return (
   <>
   <LoginLeftSide value={{ Auth:  <SignUp/>}}/>
   
   </>
  )
}

export default SignUpPage
