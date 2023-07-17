import { ReactElement } from "react";
import { SignIn } from "../authPage/login/signIn";
import { LoginLeftSide } from "../authPage/LoginLeftBanner/LoginLeftSide";
import { MainHeader } from "../userHeader/MainHeader/MainHeader";

 const LoginPage = (): ReactElement => {
  return (
    <>
    <MainHeader/>
<LoginLeftSide value={{ Auth:<SignIn />}} />
    </>
  );
};

export default LoginPage