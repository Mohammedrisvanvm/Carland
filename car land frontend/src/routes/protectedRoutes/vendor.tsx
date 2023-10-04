import React, { Children, useEffect, useState } from "react";
import { Outlet,  useLocation, useNavigate,Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store/storeHook";

interface Props {
  children: React.ReactNode;

}

const ProtectedRouteVendor = ({ children }: Props): React.ReactNode => {
  const vendor = useAppSelector((state) => state.vendor);
// const Navigate=useNavigate()
  const location = useLocation();

//   }
  if (vendor.accessToken) {
    if (
      location.pathname === "/vendor/login" ||
      location.pathname === "/vendor/signup" ||
      location.pathname === "/vendor/otp"
    ) {
        return <Navigate to={"/vendor"} />;
   
    } else {
      return children;
    }
  } else {
    if (
      location.pathname === "/vendor/login" ||
      location.pathname === "/vendor/signup" ||
      location.pathname === "/vendor/otp"
    ) {
      return children;
    } else {
        return <Navigate to={"/vendor/login"} />;
    }
  }
};

export default ProtectedRouteVendor;
