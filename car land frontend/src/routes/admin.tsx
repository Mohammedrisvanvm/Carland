import React from "react";
import { Route, Routes } from "react-router";
import AdminDashboard from "../components/admin/adminDashboard/Dashboard";
import AdminLogin from "../components/admin/adminauth/adminLogin";
import PrivateRoute from "../utils/PrivateRoute";
import { useAppSelector } from "../redux/store/storeHook";
import AdminDashboardPage from "../components/admin/adminDashboard/adminDashboardPage";

const AdminRouters = () => {
  const { admin } = useAppSelector((state) => state);
  return (
    <Routes>
      {admin.email && (
        <>
          <Route path="/adminhome" element={<AdminDashboardPage/>} />
          {/* <Route path="/userManagement" element={<UserManagement />} /> */}
        </>
      )}
      {admin.email === null && (
        <>
          <Route path="/*" element={<AdminLogin />} />
        </>
      )}

      {/* <Route element={<PrivateRoute role={"admin"}  />}> */}

      {/* </Route> */}
    </Routes>
  );
};

export default AdminRouters;
