import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store/storeHook";

interface Props {
  role: string;
}

const PrivateRoute = (props: Props): React.ReactNode => {
  const { user, admin, vendor } = useAppSelector((state) => state);
  const [auth, setAuth] = useState<boolean>(false);
  const location = useLocation();

  if (props.role === "user" && user.accessToken) {
    return user.accessToken ? (
      <Outlet />
    ) : (
      <Navigate
        to="/UserLogin"
        state={{ from: location.pathname }}
        replace={true}
      />
    );
  } else if (props.role === "admin" && admin.accessToken) {
    console.log("HAI");
    
    return user.accessToken ? (
      <Outlet />
    ) : (
      <Navigate
        to="/admin"
        state={{ from: location.pathname }}
        replace={true}
      />
    );
  } else if (props.role === "vendor" && vendor.email) {
    return vendor.email ? (
      <Outlet />
    ) : (
      <Navigate
        to="/vendor/login"
        state={{ from: location.pathname }}
        replace={true}
      />
    );
  }
};

export default PrivateRoute;
