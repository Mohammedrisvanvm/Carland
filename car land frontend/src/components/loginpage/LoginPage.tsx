import { ReactElement } from "react";
import { GoogleAuth } from "../authPage/googleAuth/googleAuth";
import { Otp } from "../authPage/otp/Otp";
import { SignUp } from "../authPage/signUp/SignUpForm";
import { SignIn } from "../authPage/login/signIn";
import { LoginLeftSiide } from "../authPage/LoginLeftBanner/LoginLeftSiide";

export const LoginPage = (): ReactElement => {
 

  
  return (


    <>

<LoginLeftSiide value={{ Auth:   <SignIn />}} />



      <GoogleAuth />




      <Otp />
      <SignUp />
      <SignIn />
    </>
  );
};