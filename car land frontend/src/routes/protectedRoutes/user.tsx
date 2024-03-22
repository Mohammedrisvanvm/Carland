import React, { Children, useEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store/storeHook";

interface Props {
  children: React.ReactNode;
  role: string;
}

const ProtectedRouteuser = ({ children, role }: Props): React.ReactNode => {
  const user = useAppSelector((state) => state.user);

  const location = useLocation();

  if (role === "user" && user.accessToken) {

    if (
      location.pathname === "/userlogin" ||
      location.pathname === "/usersignup" ||
      location.pathname === "/userotp" ||
      location.pathname === "/userauth"
    ) {
      return <Navigate to={"/"} />;
    } else {
      return children;
    }
  } else {
    if (
      location.pathname === "/userlogin" ||
      location.pathname === "/usersignup" ||
      location.pathname === "/userotp" ||
      location.pathname === "/userauth"
    ) {
      return children;
    } else {
      return <Navigate to={"/userauth"} />;
    }
  }
};

export default ProtectedRouteuser;
