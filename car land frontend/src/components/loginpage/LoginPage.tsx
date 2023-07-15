import { ReactElement } from "react";
import { SignIn } from "../authPage/login/signIn";
import { LoginLeftSide } from "../authPage/LoginLeftBanner/LoginLeftSide";

 const LoginPage = (): ReactElement => {
  return (
    <>
<LoginLeftSide value={{ Auth:   <SignIn />}} />
    </>
  );
};

export default LoginPage