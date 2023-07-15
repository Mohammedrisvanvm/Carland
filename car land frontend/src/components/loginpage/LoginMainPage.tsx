import { ReactElement } from "react";
import { GoogleAuth } from "./loginform/googleAuth";
import { Otp } from "./loginform/Otp";
import { SignUp } from "./loginform/SignUpForm";
import { SignIn } from "./loginform/signIn";
import { LoginLeftSiide } from "./loginform/LoginLeftSiide";

export const LoginMainPage = (): ReactElement => {
  return (
    <>

<LoginLeftSiide value={{ GoogleAuth: <GoogleAuth /> }} />
      {/* <GoogleAuth /> */}




      <Otp />
      <SignUp />
      <SignIn />
    </>
  );
};