import React from "react";
import { Route, Routes } from "react-router";
import AdminDashboard from "../components/admin/adminDashboard/Dashboard";
import AdminLogin from "../components/admin/adminauth/adminLogin";
import PrivateRoute from "../utils/PrivateRoute";
import { useAppSelector } from "../redux/store/storeHook";
import AdminDashboardPage from "../components/admin/adminDashboard/adminDashboardPage";
import AdminUserManagementPage from "../components/admin/adminUserManagement/UserManagementPage";

const AdminRouters = () => {
  const { admin } = useAppSelector((state) => state);
  return (
    <Routes>
      {admin.email && (
        <>
          <Route path="/admindashboard" element={<AdminDashboardPage/>} />
          <Route path="/usermanagement" element={<AdminUserManagementPage />} />
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
