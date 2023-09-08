import React, { Children, useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store/storeHook";
interface props {
  role: string;
  route: string;
  children?: React.ReactNode;
}

function PrivateRoute(props: props) {
  const { user, admin, vendor } = useAppSelector((state) => state);
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.role == "user") {
      if (user.accessToken) {
        setAuth(true);
      } else {
        setAuth(false);
        navigate("/user");
      }
    } else if (props.role == "admin") {
      if (admin.accessToken) {
        setAuth(true);
      } else {
        setAuth(false);
        navigate("/admin");
      }
    } else if (props.role == "vendor") {
      console.log("vendor");

      if (vendor.email) {
        setAuth(true);
      } else {
        setAuth(false);
        navigate("/vendor");
      }
    }
  });
  return <>{auth ? <Outlet /> : <Navigate to={props.route} />}</>;
}

export default PrivateRoute;
