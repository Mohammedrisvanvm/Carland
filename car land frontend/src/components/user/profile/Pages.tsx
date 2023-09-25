import React, { FC, SetStateAction, Dispatch } from "react";
import LeftSide from "./LeftSide";
import MyAccount from "./MyAccount";
import ProfileVerification from "./ProfileVerification";

interface MyComponentProps {
  role: string;
  setloading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}
const Pages: FC<MyComponentProps> = ({
  role,
  setloading,
  loading,
}: MyComponentProps) => {
  return (
    <>
      {role === "Account" ? (
        <MyAccount setloading={setloading} loading={loading} />
      ) : null}
      {role === "Verification" ? (
        <ProfileVerification setloading={setloading} loading={loading} />
      ) : null}
    </>
  );
};

export default Pages;
