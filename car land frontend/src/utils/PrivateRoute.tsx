import React, { Children, useEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store/storeHook";

interface Props {
  children: React.ReactNode;
  role: string;
}

const PrivateRoute = ({ children, role }: Props): React.ReactNode => {
  const { user, admin, vendor } = useAppSelector((state) => state);
  const [auth, setAuth] = useState<boolean>(false);
  const location = useLocation();

  if (role === "user" && user.accessToken) {
    return user.accessToken ? (
      <Outlet />
    ) : (
      <Navigate
        to="/UserLogin"
        state={{ from: location.pathname }}
        replace={true}
      />
    );
  } else if (role === "admin" && admin.accessToken) {
    console.log("HAI");

    return user.accessToken ? (
      <Outlet />
    ) : (
      <Navigate to="/admin" replace={true} />
    );
  } else if (role === "vendor") {
    if (!vendor.accessToken) {
      if (location.pathname !== "/vendor/login" && location.pathname !== "/vendor/signup" && location.pathname !== "/vendor/otp") {
        return <Navigate to="/vendor/login" />;
      }
      return <>{children}</>;
    } else {
      if (location.pathname === "/vendor/login") {
        return <Navigate to="/vendor" />;
      }
      return <>{children}</>;
    }
  }
};

export default PrivateRoute;

// if (!accessToken) {
//   if (location.pathname !== "/admin/login") {
//     return <Navigate to="/admin/login" />
//   }
//   return <>{children}</>
// }else{
//   if (location.pathname === "/admin/login") {
//     return <Navigate to="/admin" />
//   }
//   return <>{children}</>;
// }
// }
// if (!accessToken) {
//   if (location.pathname !== "/admin/login") {
//     return <Navigate to="/admin/login" />;
//   }
//   return <>{children}</>;
// } else {
//   if (location.pathname === "/admin/login") {
//     return <Navigate to="/admin" />;
//   }
//   return <>{children}</>;
// }
